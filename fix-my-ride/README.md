# Sachin Kekan — B.Tech IT student portfolio

A responsive student portfolio built with React, TypeScript, Three.js, and an Express backend. It is themed around a final-year B.Tech IT student at Chhatrapati Shivaji Maharaj University. The hero contains a real, animated 3D glass object. The contact form validates submissions, saves a local backup, and emails configured messages to officialsachinkekan@gmail.com.

## Start the site

Install Node.js 20.19 or newer (Node 22.12 or newer also works), then open a terminal in this folder and run:

1. npm install
2. npm run dev
3. Open http://localhost:5173

The Vite frontend runs on port 5173 and proxies API requests to the Express server on port 3001. The API health endpoint is /api/health.

## Open it on Windows without Codex

- Double-click `start-design.cmd` for the live design preview at http://localhost:5173.
- Double-click `start-website.cmd` to build and open the full site with the contact API at http://localhost:3001.
- Close the minimized server window to stop the site.

## Configure contact email

1. Copy .env.example to .env in this folder.
2. Create a Google App Password for the sending Gmail account and put it in SMTP_PASS in .env.
3. Restart the server. A valid contact form message will be emailed to CONTACT_TO and also saved in data/contact-messages.jsonl.

Google requires 2-Step Verification before an App Password can be created. Use the App Password only in the local .env file; do not paste it into chat or commit it to a repository. SMTP_USER must be the Gmail account that sends the message. SMTP_FROM defaults to SMTP_USER. The form reports when email is not configured or delivery fails, while retaining the local backup.

## Production

Run npm run build, then set NODE_ENV to production and run npm start from this folder. The Express server serves the built frontend and the contact API on port 3001. Set PORT to use a different port.

## Make it yours

- Update the brand, introduction, education details, project labels, or contact information in src/App.tsx and index.html as needed.
- The Moviestime card links to the live OTT project. Campus Circle is labeled as a concept build; replace it with coursework or another completed project when ready.
- The header uses the responsive StaggeredMenu from React Bits, styled with the portfolio’s crimson glass palette and a Sachin Kekan wordmark; index.html links to the custom SK icon in public/favicon.svg.
- The crimson moon landscape in public/crimson-moon-background.png is a fixed, darkened backdrop. src/PetalField.tsx layers in slow, glowing sakura petals and respects reduced-motion preferences.
- Edit the project artwork in the ProjectArtwork component in src/App.tsx, or replace it with your own images.
- Adjust color, type, spacing, and responsive behavior in src/styles.css.
- Tune the animated geometry, lighting, and particles in src/OrbScene.tsx.
- The React Bits components live in src/Magnet.tsx, src/SpecularButton.tsx, src/MagicBento.tsx, and src/StaggeredMenu.tsx.
- Contact submissions are backed up at data/contact-messages.jsonl and emailed after SMTP is configured.

The project uses TypeScript in both the React frontend and Node backend.
