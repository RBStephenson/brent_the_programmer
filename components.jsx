// Shared components for brent_the_programmer.
// Globals exported: Brand, Nav, SiteHeader, SiteFooter, IconBtn, Placeholder,
// SocialIcon, Icon.

/* ── Icons (inline SVG, stroke-based) ──────────────────────────────────── */
function Icon({ name, size = 14 }) {
  const s = { width: size, height: size, fill: "none", stroke: "currentColor",
              strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "moon": return <svg viewBox="0 0 24 24" {...s}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>;
    case "sun":  return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
    case "youtube": return <svg viewBox="0 0 24 24" {...s}><rect x="2.5" y="6" width="19" height="12" rx="3"/><path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg>;
    case "instagram": return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>;
    case "facebook": return <svg viewBox="0 0 24 24" {...s}><path d="M14 8h2.5V5H14c-2 0-3 1-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V8.5c0-.3.2-.5.5-.5Z"/></svg>;
    case "arrow":  return <svg viewBox="0 0 24 24" {...s}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "close":  return <svg viewBox="0 0 24 24" {...s}><path d="m6 6 12 12M18 6 6 18"/></svg>;
    case "chevL":  return <svg viewBox="0 0 24 24" {...s}><path d="m15 6-6 6 6 6"/></svg>;
    case "chevR":  return <svg viewBox="0 0 24 24" {...s}><path d="m9 6 6 6-6 6"/></svg>;
    case "rss":    return <svg viewBox="0 0 24 24" {...s}><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>;
    case "link":   return <svg viewBox="0 0 24 24" {...s}><path d="M10 14a4 4 0 0 0 5.5.5l3-3a4 4 0 0 0-5.5-5.5l-1 1M14 10a4 4 0 0 0-5.5-.5l-3 3a4 4 0 0 0 5.5 5.5l1-1"/></svg>;
    case "mail":   return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    default: return null;
  }
}

/* ── Brand wordmark ────────────────────────────────────────────────────── */
function Brand({ go }) {
  return (
    <a className="brand" onClick={() => go("home")} aria-label="home">
      <span className="prompt">~</span>
      <span>brent<span className="underscore">_</span>the<span className="underscore">_</span>programmer</span>
      <span className="cursor" aria-hidden="true"></span>
    </a>
  );
}

/* ── Header nav ────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "home",     label: "home" },
  { id: "gallery",  label: "gallery" },
  { id: "studio",   label: "studio" },
  { id: "blog",     label: "blog" },
  { id: "now",      label: "now" },
  { id: "about",    label: "about" },
  { id: "awareness", label: "me/cfs" },
];

function SiteHeader({ route, go, theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="shell">
        <Brand go={go} />
        <nav className="nav">
          {NAV_ITEMS.map((n) => (
            <a key={n.id}
               className={route === n.id ? "active" : ""}
               onClick={() => go(n.id)}>
              <span className="slash">/</span><span className="label">{n.label}</span>
            </a>
          ))}
        </nav>
        <button className="hicon" aria-label="toggle theme" onClick={onToggleTheme}
                title={theme === "studio" ? "Light theme" : "Dark theme"}>
          <Icon name={theme === "studio" ? "sun" : "moon"} />
        </button>
      </div>
    </header>
  );
}

/* ── Footer ────────────────────────────────────────────────────────────── */
function SiteFooter({ go }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div>
          <Brand />
          <p className="muted" style={{ maxWidth: 340, marginTop: 18, fontSize: 14, lineHeight: 1.55 }}>
            A quiet workshop on the internet — figures, miniatures, and the slow
            practice of caring for yourself first so you can care for others.
          </p>
        </div>
        <div>
          <h4>Pages</h4>
          <ul>
            <li><a onClick={() => go("home")}>Home</a></li>
            <li><a onClick={() => go("gallery")}>Gallery</a></li>
            <li><a onClick={() => go("studio")}>Studio</a></li>
            <li><a onClick={() => go("blog")}>Blog</a></li>
            <li><a onClick={() => go("now")}>Now</a></li>
            <li><a onClick={() => go("about")}>About</a></li>
            <li><a onClick={() => go("awareness")}>ME/CFS awareness</a></li>
          </ul>
        </div>
        <div>
          <h4>Elsewhere</h4>
          <ul>
            {SOCIALS.map((s) => {
              const ext = s.url && s.url.startsWith("http");
              return (
                <li key={s.id}>
                  <a href={s.url} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}
                     style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <Icon name={s.id} size={14} />
                    <span>{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h4>Subscribe</h4>
          <p className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
            One email a month. Workshop notes, the occasional finished mini,
            zero promotion.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); const v = e.target.email.value.trim(); window.location.href = `mailto:brent.stephenson@brenttheprogrammer.com?subject=${encodeURIComponent("Subscribe me")}&body=${encodeURIComponent("Please add me to the monthly email" + (v ? ": " + v : "") + ".")}`; }} style={{ display: "flex", gap: 6 }}>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              style={{
                flex: 1, padding: "8px 10px", border: "1px solid var(--rule)",
                borderRadius: 4, background: "var(--paper-2)", color: "inherit",
                font: "13px var(--f-body)", outline: "none"
              }}
            />
            <button className="btn" style={{ padding: "8px 12px" }}>
              ok
            </button>
          </form>
        </div>
        <div className="footer-signoff" style={{ gridColumn: "1 / -1" }}>
          <span>Trust the process.</span>
          <span>Take care of yourself.</span>
          <span>One brushstroke at a time.</span>
        </div>
        <div className="colophon" style={{ gridColumn: "1 / -1" }}>
          <span>© 2026 brent_the_programmer · made with thinned paint</span>
          <span>last commit: feat(home): updated now-projects · 2h ago</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Image or placeholder, with brush spinner during load ──────────────
   If `src` is provided, renders an <img> and shows <PaintbrushSpinner>
   until it finishes loading (or errors out, in which case we fall back
   to the striped placeholder). Without `src`, behaves as a pure
   placeholder — briefly shows the spinner so the affordance is visible
   even with no real image. */
function Placeholder({ label, sub, aspect, src, alt, fit = "cover", className = "", style = {} }) {
  // STATE: "loading" → "loaded" (img) or "fallback" (no src or img errored)
  const [state, setState] = React.useState(src ? "loading" : "loading-fake");
  React.useEffect(() => {
    if (src) {
      setState("loading");
      return;
    }
    // No real image: brief fake load so the spinner is visible.
    const t = setTimeout(() => setState("fallback"), 600 + Math.random() * 700);
    return () => clearTimeout(t);
  }, [src]);

  const showSpinner = state === "loading" || state === "loading-fake";
  const showImage   = src && state === "loaded";
  const showFallback = !showImage && state === "fallback";

  return (
    <div className={`ph ${className} ${showSpinner ? "ph-loading" : ""} ${showImage ? "ph-has-image" : ""}`}
         style={{ aspectRatio: aspect, ...style }}>
      {src && (
        <img
          src={src}
          alt={alt || label || ""}
          loading="lazy"
          decoding="async"
          onLoad={() => setState("loaded")}
          onError={() => setState("fallback")}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: fit,
            opacity: showImage ? 1 : 0,
            transition: "opacity .35s ease",
          }}
        />
      )}
      {showSpinner && <PaintbrushSpinner size={56} />}
      {showFallback && (
        <>
          <span className="corner">image · 1:1 to drop in</span>
          <span>{label}</span>
          {sub && <span className="br">{sub}</span>}
        </>
      )}
    </div>
  );
}

/* ── Paintbrush loading spinner ────────────────────────────────────────────
   A brush rotating around the center with a paint-stroke comet trail. Built
   with two synced rotations: the trail is a partial circular stroke and the
   brush sits at its leading edge. Use this anywhere you'd reach for a
   generic spinner — image loads, fetch states, etc.

   Usage:
     <PaintbrushSpinner />                  // 56px, accent-colored
     <PaintbrushSpinner size={32} />        // smaller
     <PaintbrushSpinner label="loading…" /> // with caption underneath
*/
function PaintbrushSpinner({ size = 56, label }) {
  return (
    <div className="brush-spinner-wrap" role="status" aria-label="loading">
      <svg viewBox="0 0 100 100" width={size} height={size}
           className="brush-spinner" aria-hidden="true">
        {/* Faint full ring for context */}
        <circle cx="50" cy="50" r="34"
                fill="none" stroke="currentColor"
                strokeOpacity="0.12" strokeWidth="1.5" />
        {/* Painted comet trail — same circle, partial stroke */}
        <g className="brush-trail-g">
          <circle cx="50" cy="50" r="34"
                  fill="none" stroke="var(--accent)"
                  strokeWidth="3.5" strokeLinecap="round"
                  strokeDasharray="55 158.6" />
        </g>
        {/* The brush: handle → ferrule → bristles, tip at (62, 50) */}
        <g className="brush-arm-g">
          {/* handle */}
          <rect x="8" y="48" width="32" height="4" rx="2"
                fill="#8c6a4a" stroke="#5a3e22" strokeWidth="0.5" />
          {/* grip ridges */}
          <rect x="14" y="48" width="1.5" height="4" fill="#5a3e22" opacity="0.5" />
          <rect x="20" y="48" width="1.5" height="4" fill="#5a3e22" opacity="0.5" />
          <rect x="26" y="48" width="1.5" height="4" fill="#5a3e22" opacity="0.5" />
          {/* ferrule (metal band) */}
          <rect x="40" y="46.5" width="6" height="7" rx="0.5"
                fill="#c8c8c8" stroke="#7a7a7a" strokeWidth="0.5" />
          <line x1="42.5" y1="46.5" x2="42.5" y2="53.5" stroke="#7a7a7a" strokeWidth="0.4" />
          {/* bristles, tapering to a point at the tip */}
          <path d="M46 46.5 L58 47.8 L62 50 L58 52.2 L46 53.5 Z"
                fill="var(--accent)"
                stroke="rgba(0,0,0,0.35)" strokeWidth="0.5"
                strokeLinejoin="round" />
          {/* "wet paint" highlight */}
          <path d="M48 48 L56 48.8 L58.5 50 L56 51.2 L48 52 Z"
                fill="#fff" fillOpacity="0.22" />
          {/* fresh paint drop pulsing at the tip */}
          <circle cx="62" cy="50" r="1.8" fill="var(--accent)" className="brush-drop" />
        </g>
      </svg>
      {label && <span className="brush-spinner-label">{label}</span>}
    </div>
  );
}

/* ── Social link card (used on home + contact) ─────────────────────────── */
function SocialCard({ social }) {
  const external = social.url && social.url.startsWith("http");
  return (
    <a
      href={social.url || "#"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: 14, padding: 14,
        border: "1px solid var(--rule)", borderRadius: "var(--radius)",
        cursor: "pointer", transition: "transform .15s, background-color .15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "var(--paper-2)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.background = "transparent"; }}
    >
      <div
        style={{
          width: 44, height: 44, borderRadius: "50%",
          display: "grid", placeItems: "center",
          background: "var(--accent)", color: "var(--accent-ink)", flexShrink: 0
        }}
      >
        <Icon name={social.id} size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 20, lineHeight: 1.1 }}>{social.label}</div>
        <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>{social.handle}</div>
      </div>
      <Icon name="arrow" size={16} />
    </a>
  );
}

Object.assign(window, { Icon, Brand, SiteHeader, SiteFooter, Placeholder, PaintbrushSpinner, SocialCard, BackToTop, NAV_ITEMS });

/* ── Back-to-top floating button ──────────────────────────────────────────
   Appears after the user scrolls past ~400px. Smooth-scrolls to the top
   when clicked. Lives in the corner without competing with the Tweaks
   panel — sits above-and-left of where the Tweaks toggle would sit. */
function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button
      onClick={toTop}
      aria-label="back to top"
      className={`back-to-top ${visible ? "visible" : ""}`}
      title="Back to top"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
      <span className="lbl">top</span>
    </button>
  );
}
