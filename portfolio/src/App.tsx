import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  GraduationCap
} from "lucide-react";
import OrbScene from "./OrbScene";
import Magnet from "./Magnet";
import SpecularButton from "./SpecularButton";
import MagicBento from "./MagicBento";
import StaggeredMenu from "./StaggeredMenu";
import PetalField from "./PetalField";

type ContactStatus = "idle" | "sending" | "sent" | "saved" | "error";
type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  variant: "cinema" | "violet" | "lime" | "coral" | "research";
  url: string;
  external?: boolean;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Moviestime",
    category: "OTT PLATFORM · LIVE PROJECT",
    description: "My OTT web project for discovering films, series, anime, and more.",
    variant: "cinema",
    url: "https://themoviestime.net/",
    external: true
  },
  {
    number: "02",
    title: "Campus Circle",
    category: "CONCEPT BUILD · 2026",
    description: "One place for campus events, student groups, and notices.",
    variant: "lime",
    url: "#contact"
  },
  {
    number: "03",
    title: "Portfolio / v01",
    category: "PERSONAL SITE · 2026",
    description: "A personal web experiment in glass, motion, and 3D.",
    variant: "coral",
    url: "#contact"
  },
  {
    number: "04",
    title: "Fix My Ride",
    category: "RESEARCH PROTOTYPE · 2026",
    description: "A location-aware roadside assistance application for faster, safer, and more transparent vehicle support.",
    variant: "research",
    url: "http://localhost:5173",
    external: true
  }
];

function ProjectArtwork({ variant }: { variant: Project["variant"] }) {
  if (variant === "cinema") {
    return (
      <div className="artwork artwork--cinema" aria-hidden="true">
        <div className="cinema-orbit" />
        <div className="cinema-poster glass-card">
          <div className="cinema-poster-top"><span>MOVIE · SERIES · ANIME</span><span>MT / 01</span></div>
          <div className="cinema-moon" />
          <strong>MOVIES<br /><em>TIME</em></strong>
          <div className="cinema-poster-foot"><span>YOUR NEXT STORY STARTS HERE</span><span>4K · HDR</span></div>
        </div>
        <span className="cinema-tag"><i /> STREAMING, REIMAGINED</span>
      </div>
    );
  }

  if (variant === "violet") {
    return (
      <div className="artwork artwork--violet" aria-hidden="true">
        <div className="finance-card glass-card">
          <div className="finance-top"><span>MY STUDY WEEK</span><span className="mini-dot" /></div>
          <div className="finance-balance study-title">One week,<span>in focus.</span></div>
          <div className="finance-label">FOCUS SESSIONS <span>03 PLANNED</span></div>
          <div className="chart-bars">
            {[34, 46, 39, 61, 48, 73, 53, 83, 67, 94, 71, 100].map((height, index) => (
              <i key={index} style={{ height: height + "%" }} />
            ))}
          </div>
          <div className="finance-bottom"><span>MON</span><span>WED</span><span>FRI</span></div>
        </div>
        <div className="art-orbit" />
        <span className="art-label">small steps add up</span>
      </div>
    );
  }

  if (variant === "lime") {
    return (
      <div className="artwork artwork--lime" aria-hidden="true">
        <span className="goodform-stamp">CAMPUS<br />CIRCLE</span>
        <div className="lime-disc" />
        <div className="workout-chip glass-card"><span>STUDENT COMMUNITY</span><strong>Find your<br />people.</strong><i>EVENTS + CLUBS <ArrowUpRight size={15} /></i></div>
        <span className="art-grid-word">meet here.</span>
      </div>
    );
  }

  if (variant === "research") {
    return (
      <div className="artwork artwork--research" aria-hidden="true">
        <div className="research-grid" />
        <div className="research-radar research-radar--one" />
        <div className="research-route research-route--one" />
        <div className="research-route research-route--two" />
        <div className="research-pin research-pin--user"><span>YOU</span></div>
        <div className="research-pin research-pin--help"><span>HELP</span></div>
        <div className="research-request glass-card">
          <div className="research-request-top"><span>LIVE REQUEST</span><i /></div>
          <strong>08 <small>MIN</small></strong>
          <span><i /> PARTNER ASSIGNED</span>
        </div>
        <span className="research-coordinate">19°04' N / 73°00' E</span>
      </div>
    );
  }

  return (
    <div className="artwork artwork--coral" aria-hidden="true">
      <div className="sound-record"><div className="record-core"><span>&lt;IT&gt;</span></div></div>
      <div className="sound-player glass-card"><span className="sound-kicker">PERSONAL BUILD</span><strong>Portfolio v01</strong><span className="sound-artist">GLASS · MOTION · THREE.JS</span><div className="sound-wave">{Array.from({ length: 26 }, (_, index) => <i key={index} style={{ height: (20 + ((index * 17) % 55)) + "%" }} />)}</div></div>
      <span className="sound-orbit sound-orbit--one" /><span className="sound-orbit sound-orbit--two" />
    </div>
  );
}

const projectBentoItems = projects.map((project) => ({
  id: project.number,
  label: project.category,
  title: project.title,
  description: project.description,
  visual: <ProjectArtwork variant={project.variant} />,
  href: project.url,
  target: project.external ? "_blank" : undefined,
  rel: project.external ? "noreferrer" : undefined
}));

function App() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    document.body.classList.add("has-js");
    const sections = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach((section) => observer.observe(section));
    const trackPointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", event.clientX + "px");
      document.documentElement.style.setProperty("--pointer-y", event.clientY + "px");
    };
    window.addEventListener("pointermove", trackPointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", trackPointer);
      document.body.classList.remove("has-js");
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setNotice("");
    const values = new FormData(form);
    const payload = {
      name: String(values.get("name") || ""),
      email: String(values.get("email") || ""),
      message: String(values.get("message") || ""),
      website: String(values.get("website") || "")
    };

    if (import.meta.env.PROD && import.meta.env.BASE_URL !== "/") {
      const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
      const body = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`);
      window.location.href = `mailto:officialsachinkekan@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
      setStatus("saved");
      setNotice("Your email app will open with this message.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json() as { ok?: boolean; emailSent?: boolean; error?: string; notice?: string };
      if (!response.ok) throw new Error(result.error || "Your message could not be sent.");
      form.reset();
      if (result.emailSent) {
        setStatus("sent");
        setNotice("Your message was emailed and saved locally.");
      } else {
        setStatus("saved");
        setNotice(result.notice || "Your message was saved locally, but email delivery is not configured yet.");
      }
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "Could not connect. Please try again.");
    }
  }

  return (
    <>
      <div
        className="site-backdrop"
        aria-hidden="true"
        style={{ "--site-backdrop-image": `url("${import.meta.env.BASE_URL}crimson-moon-background.png")` } as CSSProperties}
      />
      <div className="pointer-glow" aria-hidden="true" />
      <PetalField />
      <StaggeredMenu
        className="sachin-menu"
        position="right"
        items={[
          { label: "Home", ariaLabel: "Go to the top", link: "#top" },
          { label: "Projects", ariaLabel: "Explore Sachin’s projects", link: "#work" },
          { label: "About", ariaLabel: "Read about Sachin", link: "#about" },
          { label: "Contact", ariaLabel: "Contact Sachin", link: "#contact" }
        ]}
        socialItems={[
          { label: "EMAIL SACHIN ↗", link: "mailto:officialsachinkekan@gmail.com" },
          { label: "MOVIESTIME ↗", link: "https://themoviestime.net/" }
        ]}
        displaySocials
        displayItemNumbering
        brandLabel="Sachin Kekan"
        brandTagline="B.TECH IT · PORTFOLIO"
        menuButtonColor="#f5f3ed"
        openMenuButtonColor="#f5f3ed"
        changeMenuColorOnOpen={false}
        colors={["#ff4966", "#401426", "#1a111b", "#090a10"]}
        accentColor="#ff4966"
        isFixed
        closeOnClickAway
      />

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> B.TECH INFORMATION TECHNOLOGY <span className="eyebrow-divider">/</span> FINAL YEAR</div>
            <div className="hero-status" role="status"><span className="hero-status-dot" /> AVAILABLE FOR INTERNSHIPS <span className="hero-status-divider" /> WEB · PRODUCT · IT</div>
            <h1 className="hero-title" id="hero-title"><span>Sachin</span><span className="headline-accent">Kekan<span className="title-period">.</span></span></h1>
            <p className="hero-description">I’m <strong>Sachin Kekan</strong> — a final-year B.Tech IT student at Chhatrapati Shivaji Maharaj University. I turn ideas into thoughtful web experiences, with a special interest in media and streaming products.</p>
            <div className="hero-actions">
              <Magnet padding={90} magnetStrength={4} maxOffset={8} tilt={4} scale={1.02}>
                <SpecularButton
                  size="sm"
                  radius={10}
                  tint="#f2f0eb"
                  tintOpacity={0.94}
                  textColor="#111119"
                  lineColor="#ffd0d8"
                  baseColor="#ff4966"
                  intensity={0.85}
                  idleIntensity={0.2}
                  shineSize={10}
                  shineFade={34}
                  thickness={1.2}
                  glow={0.75}
                  className="button button--light hero-primary-cta"
                  onClick={() => document.querySelector<HTMLElement>("#work")?.scrollIntoView({ behavior: "smooth" })}
                  aria-label="Explore my projects"
                >
                  Explore my projects <ArrowDownRight size={17} />
                </SpecularButton>
              </Magnet>
              <a className="text-link" href="#about">My journey <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-art" aria-label="A floating glass 3D object with orbital rings">
            <div className="hero-art-glow" />
            <div className="orb-caption orb-caption--top"><span>FIG. 01</span><i /> STUDENT UNIVERSE</div>
            <OrbScene />
            <div className="orb-label orb-label--left glass-pill"><i /> LEARN <span>+</span> BUILD</div>
            <div className="orb-label orb-label--right glass-pill">B.TECH · IT <ArrowUpRight size={12} /></div>
            <div className="orb-caption orb-caption--bottom"><span>FINAL YEAR · CSMU</span><span>LEARNING BY BUILDING</span></div>
          </div>
          <div className="hero-bottomline"><span>SCROLL TO EXPLORE</span><span className="scroll-indicator"><ArrowDown size={13} /></span><span className="hero-year">STUDENT PORTFOLIO — 2026</span></div>
          <div className="hero-rail" aria-label="Portfolio snapshot"><span><b>03</b> SELECTED BUILDS</span><span><b>01</b> LIVE PRODUCT</span><span><b>∞</b> IDEAS IN PROGRESS</span></div>
        </section>

        <section className="work-section section-shell" id="work" aria-labelledby="work-title">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> SELECTED WORK · PROJECTS + BUILDS</div>
              <h2 id="work-title">Projects <span>&amp; experiments</span><sup>04</sup></h2>
            </div>
            <p>From my OTT platform to student concepts, each project explores how useful, cinematic web experiences can feel.</p>
          </div>
          <div className="project-bento-shell reveal">
            <MagicBento
              className="project-bento"
              items={projectBentoItems}
              columns={3}
              rowHeight={390}
              gap={17}
              radius={16}
              theme="dark"
              glowColor="#ff4966"
              textAutoHide={false}
              enableBorderGlow
              enableSpotlight
              spotlightRadius={280}
              enableStars
              particleCount={12}
              enableTilt
              enableMagnetism
              clickEffect
            />
          </div>
          <div className="work-footnote reveal"><span><span className="tiny-star">✳</span> LEARNING · BUILDING · REPEATING</span><span>INTERNSHIPS OR COLLABORATIONS? <a href="#contact">LET’S CONNECT <ArrowUpRight size={13} /></a></span></div>
        </section>

        <section className="about-section section-shell" id="about" aria-labelledby="about-title">
          <div className="about-top reveal">
            <div className="about-title-block">
              <div className="eyebrow"><span className="eyebrow-line" /> B.TECH IT · FINAL YEAR</div>
              <h2 id="about-title">Learning the systems.<br /><span>Building for people.</span></h2>
            </div>
            <div className="about-note glass-card">
              <span className="note-pin"><GraduationCap size={16} /></span>
              <span className="note-kicker">ACADEMIC PROFILE</span>
              <p className="education-course"><strong>B.Tech in Information Technology</strong><br />4th Year</p>
              <p className="note-school">Chhatrapati Shivaji Maharaj University</p>
              <span className="note-signature">CSMU · INFORMATION TECHNOLOGY</span>
            </div>
          </div>
          <div className="about-bottom reveal">
            <div className="about-copy">
              <p className="about-lead">I’m learning how <em>technology can make everyday life simpler.</em></p>
              <p>I’m in my 4th year of B.Tech IT at Chhatrapati Shivaji Maharaj University. I enjoy exploring web development, understanding how software fits together, and turning what I learn into small, useful prototypes.</p>
              <a className="text-link text-link--light" href="#contact">Let’s connect <ArrowUpRight size={15} /></a>
            </div>
            <div className="skills-panel glass-card">
              <div className="skills-panel-head"><span>AREAS I’M EXPLORING</span><span>01 — 04</span></div>
              <ul>
                <li><span>01</span><strong>Frontend development</strong><span>responsive interfaces</span></li>
                <li><span>02</span><strong>Backend fundamentals</strong><span>APIs and data</span></li>
                <li><span>03</span><strong>IT foundations</strong><span>software and systems</span></li>
                <li><span>04</span><strong>Creative coding</strong><span>motion and 3D web</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-card reveal">
            <div className="contact-orb contact-orb--one" /><div className="contact-orb contact-orb--two" />
            <div className="contact-inner">
              <div className="contact-copy">
                <div className="eyebrow"><span className="eyebrow-line" /> OPEN TO WHAT’S NEXT</div>
                <h2 id="contact-title">Let’s build<br />what’s <span>next.</span></h2>
                <p>I’m a final-year B.Tech IT student open to internship opportunities, team projects, and thoughtful collaborations.</p>
                <a className="contact-email" href="#contact-form">INTERNSHIPS · PROJECTS · COLLABORATION <ArrowDownRight size={15} /></a>
              </div>
              <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
                <div className="hp-field" aria-hidden="true"><label htmlFor="website">Leave this empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
                <label htmlFor="name">YOUR NAME</label>
                <input id="name" name="name" type="text" placeholder="Your name" minLength={2} maxLength={80} autoComplete="name" required />
                <label htmlFor="email">EMAIL ADDRESS</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" maxLength={254} autoComplete="email" required />
                <label htmlFor="message">A LITTLE ABOUT IT</label>
                <textarea id="message" name="message" placeholder="Tell me about the opportunity or idea..." minLength={10} maxLength={4000} rows={3} required />
                <SpecularButton
                  size="sm"
                  radius={9}
                  tint="#ff4966"
                  tintOpacity={0.94}
                  textColor="#12150e"
                  lineColor="#ffd0d8"
                  baseColor="#ff4966"
                  intensity={0.9}
                  idleIntensity={0.18}
                  shineSize={10}
                  shineFade={34}
                  thickness={1.2}
                  glow={0.8}
                  className="button button--lime contact-submit"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : status === "sent" ? "Email sent" : status === "saved" ? "Saved locally" : "Send a message"}
                  {status === "sent" ? <Check size={16} /> : <ArrowRight size={17} />}
                </SpecularButton>
                <p className={"form-notice form-notice--" + status} aria-live="polite">{notice}</p>
              </form>
            </div>
            <div className="contact-card-foot"><span>GOOD THINGS START BY REACHING OUT.</span><span><i /> OPEN TO INTERNSHIPS</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a className="brand" href="#top" aria-label="Sachin Kekan home"><span className="brand-mark">S<span>K</span></span><span className="brand-copy"><span className="brand-name">Sachin Kekan</span><span className="brand-subtitle">B.TECH IT · PORTFOLIO</span></span></a>
        <span className="footer-note">B.TECH IT · FINAL YEAR <span>CHHATRAPATI SHIVAJI MAHARAJ UNIVERSITY</span></span>
        <a className="back-top" href="#top">BACK TO THE TOP <ArrowDown className="back-top-icon" size={14} /></a>
        <span className="copyright">© {new Date().getFullYear()} Sachin Kekan</span>
      </footer>
    </>
  );
}

export default App;
