import { useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Download,
  Fuel,
  Gauge,
  LocateFixed,
  MapPin,
  Menu,
  Navigation,
  Radio,
  Route,
  ShieldCheck,
  Siren,
  Smartphone,
  X
} from "lucide-react";

const navItems = [
  { label: "Abstract", href: "#abstract" },
  { label: "Method", href: "#methodology" },
  { label: "Architecture", href: "#architecture" },
  { label: "Evaluation", href: "#evaluation" },
  { label: "References", href: "#references" }
];

type SectionProps = {
  number: string;
  title: string;
  children: ReactNode;
  id?: string;
  className?: string;
};

function PaperSection({ number, title, children, id, className = "" }: SectionProps) {
  return (
    <section className={`paper-section ${className}`} id={id}>
      <div className="section-number">{number}</div>
      <div className="section-body">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="research-site">
      <div className="top-strip">
        <span>IEEE-STYLE RESEARCH PAPER</span>
        <span>FIX MY RIDE / FIR-2026-01</span>
        <span className="top-strip-status"><i /> PROTOTYPE STUDY</span>
      </div>

      <header className="site-header">
        <a className="paper-brand" href="#top" aria-label="Fix My Ride home" onClick={closeMenu}>
          <span className="brand-emblem"><Route size={18} /></span>
          <span><strong>FIX MY RIDE</strong><small>ROADSAFE APPLICATION LAB</small></span>
        </a>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Research paper sections">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <button className="nav-print" type="button" onClick={() => window.print()}><Download size={14} /> Print / PDF</button>
        </nav>
      </header>

      <main id="top">
        <section className="paper-hero page-width">
          <div className="hero-meta"><span>RESEARCH ARTICLE</span><span>RECEIVED 06 NOV 2026</span><span>OPEN ACCESS</span></div>
          <div className="hero-grid">
            <div className="hero-title-block">
              <p className="kicker"><span className="kicker-mark" /> Intelligent transportation systems</p>
              <h1>Fix My<br /><em>Ride.</em></h1>
              <p className="hero-deck">A location-aware roadside assistance application for faster, safer, and more transparent vehicle support.</p>
              <div className="hero-authors"><div className="author-avatar">SK</div><div><strong>Sachin Kekan</strong><span>Department of Information Technology<br />Chhatrapati Shivaji Maharaj University, India</span></div></div>
              <div className="hero-actions"><a className="primary-action" href="#abstract">Read the paper <ArrowDown size={16} /></a><button className="secondary-action" type="button" onClick={() => window.print()}><Download size={15} /> Print / PDF</button></div>
            </div>
            <div className="hero-visual" aria-label="A roadside assistance request moving from a stranded vehicle to a service partner">
              <div className="visual-radar"><span /><span /><span /><div className="radar-sweep" /></div><div className="route-line route-line--one" /><div className="route-line route-line--two" />
              <div className="map-label map-label--top"><span className="map-pulse" /> LIVE REQUEST <b>02:14</b></div>
              <div className="vehicle-node vehicle-node--user"><Smartphone size={18} /><small>YOUR RIDE</small></div><div className="vehicle-node vehicle-node--help"><Siren size={18} /><small>HELP IS ON THE WAY</small></div>
              <div className="map-pin map-pin--a"><MapPin size={17} /></div><div className="map-pin map-pin--b"><MapPin size={17} /></div><div className="map-city map-city--a">SECTOR 18</div><div className="map-city map-city--b">SERVICE HUB 04</div>
              <div className="visual-coordinates">19°04' N / 73°00' E</div><div className="visual-card"><span className="visual-card-label">ESTIMATED ARRIVAL</span><strong>08 <small>MIN</small></strong><div className="visual-card-row"><span><span className="green-dot" /> Partner assigned</span><span>4.9 ★</span></div></div>
            </div>
          </div>
          <div className="hero-footer"><span>VOL. 01 / ISSUE 01</span><span className="scroll-cue"><ArrowDown size={13} /> SCROLL TO EXPLORE</span><span>APPLICATION + RESEARCH</span></div>
        </section>

        <section className="paper-sheet page-width" id="abstract">
          <div className="sheet-head"><span>FIX MY RIDE: A LOCATION-AWARE ROADSIDE ASSISTANCE APPLICATION</span><span>IEEE FORMAT / 2026</span></div>
          <div className="abstract-block">
            <div className="abstract-label"><span>I</span> ABSTRACT</div>
            <div><p>Vehicle breakdowns are stressful because drivers must identify the problem, find a trustworthy service provider, and communicate their exact location under pressure. <strong>Fix My Ride</strong> proposes a mobile-first roadside assistance application that connects stranded motorists with nearby verified service partners through a single, trackable workflow.</p><p>The proposed system combines geolocation, service categorization, real-time request status, partner assignment, and secure communication. The paper describes the system architecture, request-matching methodology, safety controls, and a prototype evaluation plan designed around response time, location accuracy, and task completion. The solution is intended to reduce uncertainty during roadside incidents while creating a transparent operating layer for drivers and service partners.</p></div>
            <div className="keywords"><strong>Index Terms—</strong> roadside assistance, geolocation, mobile application, service dispatch, intelligent transportation systems, emergency response.</div>
          </div>

          <div className="paper-columns">
            <div>
              <PaperSection number="01" title="Introduction" id="introduction"><p>Roadside incidents often happen in unfamiliar locations and at inconvenient times. A driver may need towing, battery jump-start, tyre replacement, fuel delivery, or mechanical support, yet existing options commonly depend on phone calls, informal contacts, or fragmented service directories.</p><p>Fix My Ride treats assistance as a coordinated dispatch problem. The driver reports the incident once; the system collects the minimum operational data needed to route the request, surfaces a verified partner, and maintains a shared status trail from request to resolution.</p></PaperSection>
              <PaperSection number="02" title="Problem Statement & Objectives"><p>The central problem is the absence of a dependable, location-aware bridge between a stranded driver and an available assistance provider. The application is designed around four objectives:</p><ol className="objective-list"><li><b>Reduce friction.</b> Submit an assistance request in under one minute.</li><li><b>Improve visibility.</b> Show assignment, ETA, and request progress.</li><li><b>Support trust.</b> Expose partner identity, rating, and service estimate.</li><li><b>Protect users.</b> Share location only for the active assistance workflow.</li></ol></PaperSection>
              <PaperSection number="03" title="Related Work"><p>Existing roadside services demonstrate the value of location-based dispatch, while ride-hailing systems show how live tracking can make an uncertain wait feel measurable. Fix My Ride adapts these patterns to a higher-stress context, adding incident-specific categories and a safety-first request lifecycle.</p><div className="callout"><CircleAlert size={16} /><span><strong>Research gap.</strong> Generic service marketplaces rarely combine roadside incident context, partner verification, emergency escalation, and a low-attention interface in one flow.</span></div></PaperSection>
            </div>
            <aside className="sheet-sidebar"><div className="sidebar-card sidebar-card--accent"><span className="card-eyebrow">WHY THIS MATTERS</span><strong>Less searching.<br />More certainty.</strong><p>The product turns a stressful roadside moment into a clear sequence of actions.</p><div className="mini-stat-row"><span><b>01</b> request</span><span><b>01</b> route</span><span><b>01</b> resolution</span></div></div><div className="sidebar-card"><span className="card-eyebrow">USER ROLES</span><ul className="role-list"><li><span className="role-dot role-dot--driver" /> Driver / requester</li><li><span className="role-dot role-dot--partner" /> Service partner</li><li><span className="role-dot role-dot--ops" /> Operations admin</li></ul></div><div className="sidebar-card sidebar-card--quote"><span>“</span><p>A roadside response should feel as clear as following a route.</p><small>DESIGN PRINCIPLE / 01</small></div></aside>
          </div>

          <div className="full-rule" />
          <PaperSection number="04" title="Proposed System Architecture" id="architecture" className="architecture-section"><p>Fix My Ride uses a client–server architecture with a dispatch layer between the driver application and service partner dashboard. Each request is represented as a stateful record so that the user, partner, and operations team see the same progress state.</p><div className="architecture-diagram" aria-label="System architecture diagram"><div className="architecture-row architecture-row--actors"><div className="system-node system-node--blue"><Smartphone size={16} /><span>Driver app</span><small>report + track</small></div><div className="system-node system-node--orange"><Siren size={16} /><span>Partner app</span><small>accept + resolve</small></div><div className="system-node system-node--grey"><ShieldCheck size={16} /><span>Ops console</span><small>monitor + escalate</small></div></div><div className="connector-row"><i /><i /><i /></div><div className="architecture-core"><div className="core-title"><Radio size={17} /> FIX MY RIDE API</div><div className="core-services"><span>auth</span><span>geo service</span><span>dispatch engine</span><span>notifications</span></div></div><div className="connector-row connector-row--down"><i /><i /></div><div className="architecture-row architecture-row--data"><div className="data-node"><MapPin size={15} /><span>Location service</span></div><div className="data-node"><Route size={15} /><span>Request database</span></div><div className="data-node"><ShieldCheck size={15} /><span>Audit + privacy log</span></div></div></div></PaperSection>

          <div className="paper-columns paper-columns--method" id="methodology"><div><PaperSection number="05" title="Methodology"><p>The prototype follows a four-stage request lifecycle. A service request is created only after the driver confirms the incident category and location. The dispatch engine then ranks available partners using distance, service capability, current load, and rating.</p><div className="method-tabs" role="tablist" aria-label="Request lifecycle stages">{[
            { label: "Report", icon: CircleAlert }, { label: "Match", icon: LocateFixed }, { label: "Track", icon: Navigation }, { label: "Resolve", icon: Check }
          ].map((step, index) => { const Icon = step.icon; return <button key={step.label} className={activeStep === index ? "method-tab is-active" : "method-tab"} type="button" role="tab" aria-selected={activeStep === index} onClick={() => setActiveStep(index)}><span>0{index + 1}</span><Icon size={15} /><b>{step.label}</b></button>; })}</div><div className="method-detail"><span className="method-detail-number">0{activeStep + 1}</span><div><strong>{["Incident report", "Partner matching", "Live assistance tracking", "Resolution and feedback"][activeStep]}</strong><p>{["The driver selects a service type, confirms their location, adds a short note, and submits a request with an optional photo.", "The dispatch layer filters partners by capability and availability, then ranks the closest suitable responders.", "The driver sees partner identity, ETA, route progress, and an in-app contact option without repeating the incident details.", "The partner closes the job with a service summary. The driver confirms completion and can rate the experience."][activeStep]}</p></div></div></PaperSection></div><aside className="sheet-sidebar"><div className="sidebar-card sidebar-card--workflow"><span className="card-eyebrow">REQUEST STATES</span><div className="state-list"><span><i className="state-dot state-dot--pink" /> Submitted</span><ChevronRight size={13} /><span><i className="state-dot state-dot--orange" /> Assigned</span><ChevronRight size={13} /><span><i className="state-dot state-dot--blue" /> En route</span><ChevronRight size={13} /><span><i className="state-dot state-dot--green" /> Resolved</span></div></div><div className="sidebar-card"><span className="card-eyebrow">DESIGN CONSTRAINT</span><p className="large-note">The driver may be stressed, distracted, or standing in an unsafe place. Every primary action is kept visible, short, and reversible.</p></div></aside></div>

          <PaperSection number="06" title="Core Functional Modules"><div className="module-grid">{[
            { icon: LocateFixed, title: "Smart location", text: "GPS capture with manual pin adjustment for tunnels, service roads, and weak-signal areas." }, { icon: Gauge, title: "Service matching", text: "Capability-aware ranking for towing, fuel, battery, tyre, and mechanical support." }, { icon: Clock3, title: "Live ETA", text: "A single timeline for request status, partner arrival estimate, and escalation." }, { icon: ShieldCheck, title: "Trust layer", text: "Verified partner profile, transparent estimate, rating, and consent-based location sharing." }, { icon: Smartphone, title: "Low-attention UI", text: "Large targets, clear language, and high contrast for roadside conditions." }, { icon: Fuel, title: "Incident categories", text: "Structured reporting that helps a partner arrive with the right equipment." }
          ].map((module) => { const Icon = module.icon; return <article className="module-card" key={module.title}><div className="module-icon"><Icon size={17} /></div><h3>{module.title}</h3><p>{module.text}</p></article>; })}</div></PaperSection>

          <div className="paper-columns paper-columns--evaluation" id="evaluation"><div><PaperSection number="07" title="Prototype Evaluation"><p>The current study is a design and systems prototype. Evaluation is structured as a task-based usability test with representative roadside scenarios rather than as a claim of production-scale performance.</p><div className="evaluation-table"><div className="evaluation-row evaluation-head"><span>MEASURE</span><span>PROTOCOL</span><span>SUCCESS SIGNAL</span></div><div className="evaluation-row"><span>Request completion</span><span>Start with a simulated flat tyre</span><strong>Fewer steps, fewer errors</strong></div><div className="evaluation-row"><span>Location accuracy</span><span>Compare GPS pin with user correction</span><strong>Actionable service point</strong></div><div className="evaluation-row"><span>Response confidence</span><span>Interview after tracking task</span><strong>Clear status + ETA</strong></div></div><div className="result-note"><div><span className="result-icon"><Check size={15} /></span><strong>Evaluation status</strong></div><p>Prototype ready for moderated testing. Quantitative results will be added after participant sessions.</p></div></PaperSection></div><aside className="sheet-sidebar"><div className="sidebar-card sidebar-card--metrics"><span className="card-eyebrow">TARGET EXPERIENCE</span><div className="metric"><strong>&lt; 60 s</strong><span>request submission</span></div><div className="metric"><strong>3 taps</strong><span>to share location</span></div><div className="metric"><strong>1 view</strong><span>for live status</span></div></div><div className="sidebar-card sidebar-card--dark"><span className="card-eyebrow">SAFETY NOTE</span><p>Fix My Ride does not replace emergency services. Critical incidents should be escalated to local authorities first.</p><a href="#references">See references <ArrowUpRight size={13} /></a></div></aside></div>

          <PaperSection number="08" title="Conclusion"><p>Fix My Ride presents a focused approach to roadside assistance: make the request simple, make the response visible, and make the handoff trustworthy. By combining location-aware dispatch with a stateful user experience, the application can reduce the uncertainty that makes a breakdown more difficult than it needs to be.</p><p>Future work will include field validation, partner-side operational studies, offline-tolerant flows, multilingual support, and stronger emergency escalation rules. The prototype establishes the interaction model and technical foundation for that next stage.</p></PaperSection>
          <section className="references-section" id="references"><div className="section-number">REF.</div><div className="section-body"><h2>References</h2><ol className="references-list"><li>IEEE, <em>IEEE Editorial Style Manual for Authors</em>, IEEE Publishing Operations, 2024.</li><li>W3C, <em>Geolocation API Specification</em>, World Wide Web Consortium, 2024.</li><li>ISO, <em>ISO 39001:2012 — Road traffic safety management systems</em>, International Organization for Standardization.</li><li>J. Nielsen, <em>Usability Engineering</em>, Morgan Kaufmann, 1994.</li></ol></div></section>
          <div className="paper-end"><span>END OF PAPER</span><span>FIX MY RIDE / FIR-2026-01</span><span>THANK YOU FOR READING <ArrowUpRight size={13} /></span></div>
        </section>
      </main>
      <footer className="site-footer page-width"><div className="footer-brand"><span className="brand-emblem"><Route size={17} /></span><span><strong>FIX MY RIDE</strong><small>ROADSIDE ASSISTANCE APPLICATION</small></span></div><p>Research prototype by Sachin Kekan<br />B.Tech Information Technology · CSMU</p><a href="#top">Back to top <ArrowUpRight size={14} /></a></footer>
    </div>
  );
}

export default App;
