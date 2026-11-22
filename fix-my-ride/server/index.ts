import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.PORT) || 3001;
const messagesFile = join(process.cwd(), "data", "contact-messages.jsonl");
const contactRecipient = process.env.CONTACT_TO?.trim() || "officialsachinkekan@gmail.com";
const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = process.env.SMTP_PASS?.trim();
const smtpPort = Number(process.env.SMTP_PORT) || 465;
const mailTransport = smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    })
  : null;
const requestLog = new Map<string, { startedAt: number; count: number }>();
const limitWindowMs = 15 * 60 * 1000;
const limitCount = 5;

app.disable("x-powered-by");
app.use((_request, response, next) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Frame-Options", "SAMEORIGIN");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", emailCredentialsConfigured: Boolean(mailTransport) });
});

app.use("/api", (request, response, next) => {
  const key = request.ip || request.socket.remoteAddress || "unknown";
  const now = Date.now();
  const record = requestLog.get(key);

  if (!record || now - record.startedAt > limitWindowMs) {
    requestLog.set(key, { startedAt: now, count: 1 });
    next();
    return;
  }

  if (record.count >= limitCount) {
    response.status(429).json({ error: "Too many messages. Please try again later." });
    return;
  }

  record.count += 1;
  next();
});

app.post("/api/contact", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const body = request.body as Record<string, unknown> | null;
    if (!body || typeof body !== "object") {
      response.status(400).json({ error: "Please send a valid message." });
      return;
    }

    const name = typeof body.name === "string" ? body.name.trim().replace(/[\r\n]+/g, " ") : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";

    // Quietly accept automated form fills caught by the hidden honeypot field.
    if (website.length > 0) {
      response.status(201).json({ ok: true });
      return;
    }

    if (name.length < 2 || name.length > 80) {
      response.status(400).json({ error: "Name must be between 2 and 80 characters." });
      return;
    }
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      response.status(400).json({ error: "Please enter a valid email address." });
      return;
    }
    if (message.length < 10 || message.length > 4000) {
      response.status(400).json({ error: "Message must be between 10 and 4,000 characters." });
      return;
    }

    const record = {
      receivedAt: new Date().toISOString(),
      name,
      email,
      message
    };

    await appendFile(messagesFile, JSON.stringify(record) + "\n", "utf8");

    if (!mailTransport || !smtpUser) {
      response.status(202).json({
        ok: true,
        emailSent: false,
        notice: "Your message was saved locally, but email delivery is not configured yet."
      });
      return;
    }

    try {
      await mailTransport.sendMail({
        from: process.env.SMTP_FROM?.trim() || smtpUser,
        to: contactRecipient,
        replyTo: email,
        subject: "New portfolio message from " + name,
        text: [
          "New message from Sachin Kekan's portfolio site",
          "",
          "Name: " + name,
          "Email: " + email,
          "Received: " + record.receivedAt,
          "",
          message
        ].join("\n")
      });
      response.status(201).json({ ok: true, emailSent: true });
    } catch (mailError) {
      console.error("Contact email delivery failed:", mailError);
      response.status(202).json({
        ok: true,
        emailSent: false,
        notice: "Your message was saved locally, but the email could not be delivered. Please try again later."
      });
    }
  } catch (error) {
    next(error);
  }
});

if (process.env.NODE_ENV === "production") {
  const frontendDir = join(process.cwd(), "dist");
  app.use(express.static(frontendDir));
  app.get(/.*/, (_request, response) => {
    response.sendFile(join(frontendDir, "index.html"));
  });
}

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error("Request failed:", error);
  if (error instanceof SyntaxError) {
    response.status(400).json({ error: "Please send valid JSON." });
    return;
  }
  response.status(500).json({ error: "Something went wrong. Please try again." });
});

await mkdir(join(process.cwd(), "data"), { recursive: true });
if (!mailTransport) {
  console.warn("Contact email is not configured. Messages will be saved locally until SMTP credentials are added.");
}
app.listen(port, () => {
  console.log("Portfolio API listening at http://localhost:" + port);
});
