// brent_the_programmer — app shell.
// Owns: routing state, theme application to <html>, tweaks panel.

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState("home");      // home | gallery | blog | post | about | now | contact
  const [postId, setPostId] = React.useState(null);

  // Apply theme & accent to <html> via data-attrs so CSS variables flip.
  React.useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-theme",    t.theme);
    el.setAttribute("data-accent",   t.accent);
    el.setAttribute("data-typepair", t.typePair);
    el.setAttribute("data-density",  t.density);
    el.setAttribute("data-tape",     t.showTape ? "on" : "off");
  }, [t.theme, t.accent, t.typePair, t.density, t.showTape]);

  const go = (r) => {
    setRoute(r);
    setPostId(null);
    // Reflect the section in the URL so every page is a real, shareable link.
    // Home stays at the clean root; other sections get ?route=<name>.
    try {
      const url = r === "home" ? window.location.pathname : "?route=" + r;
      window.history.pushState({}, "", url);
    } catch (e) {}
    // Scroll to top on navigation but keep current scroll position if same route
    if (r !== route) window.scrollTo({ top: 0, behavior: "instant" });
  };
  const openPost = (id) => {
    setPostId(id);
    setRoute("post");
    // Reflect the open post in the URL so it can be shared / picked up by RSS links.
    try { window.history.pushState({}, "", "?post=" + encodeURIComponent(id)); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Deep-linking: open ?post=<id> or ?route=<name> on load, and keep the
  // back/forward buttons working.
  React.useEffect(() => {
    const VALID = ["home", "gallery", "studio", "blog", "about", "now", "awareness"];
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      const pid = params.get("post");
      if (pid && POSTS.find((p) => p.id === pid)) {
        setPostId(pid);
        setRoute("post");
        return;
      }
      setPostId(null);
      const r = params.get("route");
      setRoute(VALID.includes(r) ? r : "home");
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const toggleTheme = () => setTweak("theme", t.theme === "studio" ? "workshop" : "studio");

  const currentPost = postId ? POSTS.find((p) => p.id === postId) : null;

  // Keep the document title and social/canonical meta in step with the current
  // view. Crawlers that render JS (and people sharing links that get re-fetched
  // with JS) then see per-page metadata instead of one site-wide set.
  React.useEffect(() => {
    const SITE = "https://brenttheprogrammer.com";
    const portrait = SITE + "/assets/brent-portrait-web.jpg";
    const ROUTE_META = {
      home:      { t: "brent_the_programmer \u2014 hobby, self-care, miniatures",
                   d: "Brent \u2014 backend engineer, miniature painter, and full-time caregiver. Painting minis one thin layer at a time, self-care, and raising awareness of ME/CFS." },
      gallery:   { t: "Gallery \u2014 brent_the_programmer",
                   d: "The painted miniatures \u2014 D&D cartoon heroes, comic and anime characters, and sci-fi figures, painted one thin layer at a time." },
      studio:    { t: "The Studio \u2014 brent_the_programmer",
                   d: "Inside the studio \u2014 works in progress, tools, and process notes from the workbench." },
      blog:      { t: "Journal \u2014 brent_the_programmer",
                   d: "Essays on caregiving, self-care, and miniature painting \u2014 quiet notes from the bench." },
      about:     { t: "About \u2014 brent_the_programmer",
                   d: "About Brent \u2014 backend engineer, miniature painter, and full-time caregiver." },
      now:       { t: "Now \u2014 brent_the_programmer",
                   d: "What's on the desk right now \u2014 the current works in progress." },
      awareness: { t: "ME/CFS Awareness \u2014 brent_the_programmer",
                   d: "What myalgic encephalomyelitis (ME/CFS) is and why it matters \u2014 the disabling illness my wife and son live with." },
    };
    let meta;
    if (route === "post" && currentPost) {
      meta = {
        t: currentPost.title + " \u2014 brent_the_programmer",
        d: currentPost.excerpt || ROUTE_META.blog.d,
        img: currentPost.image ? SITE + "/" + currentPost.image : portrait,
        url: SITE + "/?post=" + currentPost.id,
      };
    } else {
      const m = ROUTE_META[route] || ROUTE_META.home;
      meta = { t: m.t, d: m.d, img: portrait,
               url: route === "home" ? SITE + "/" : SITE + "/?route=" + route };
    }
    const upsert = (sel, make) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = make(); document.head.appendChild(el); }
      return el;
    };
    const setMeta = (attr, key, val) => {
      const el = upsert("meta[" + attr + "='" + key + "']", () => {
        const m = document.createElement("meta"); m.setAttribute(attr, key); return m;
      });
      el.setAttribute("content", val || "");
    };
    document.title = meta.t;
    setMeta("name", "description", meta.d);
    setMeta("property", "og:title", meta.t);
    setMeta("property", "og:description", meta.d);
    setMeta("property", "og:url", meta.url);
    setMeta("property", "og:image", meta.img);
    setMeta("property", "og:type", route === "post" ? "article" : "website");
    setMeta("name", "twitter:title", meta.t);
    setMeta("name", "twitter:description", meta.d);
    setMeta("name", "twitter:image", meta.img);
    const link = upsert("link[rel='canonical']", () => {
      const l = document.createElement("link"); l.setAttribute("rel", "canonical"); return l;
    });
    link.setAttribute("href", meta.url);
  }, [route, postId]);

  return (
    <>
      <SiteHeader route={route} go={go} theme={t.theme} onToggleTheme={toggleTheme} />

      <div key={route + (postId || "")} className="route-fade">
        {route === "home"    && <HomePage    go={go} openPost={openPost} hero={t.hero} />}
        {route === "gallery" && <GalleryPage />}
        {route === "studio"  && <StudioPage  go={go} />}
        {route === "blog"    && <BlogPage    openPost={openPost} />}
        {route === "post"    && currentPost && <PostPage post={currentPost} go={go} openPost={openPost} />}
        {route === "about"   && <AboutPage   go={go} />}
        {route === "now"     && <NowPage />}
        {route === "awareness" && <AwarenessPage go={go} />}
      </div>

      <SiteFooter go={go} />

      <BackToTop />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio label="Mode" value={t.theme}
                    options={[{ value: "workshop", label: "Workshop" },
                              { value: "studio",   label: "Studio" },
                              { value: "bone",     label: "Bone" }]}
                    onChange={(v) => setTweak("theme", v)} />
        <TweakColor label="Accent" value={t.accent}
                    options={[
                      { value: "phthalo", label: "Phthalo green" },
                      { value: "sienna",  label: "Burnt sienna" },
                      { value: "lapis",   label: "Lapis blue" },
                      { value: "rust",    label: "Oxblood" }
                    ].map((o) => o.value)}
                    onChange={(v) => setTweak("accent", v)} />

        <TweakSection label="Type" />
        <TweakRadio label="Pairing" value={t.typePair}
                    options={[
                      { value: "serif-sans", label: "Display" },
                      { value: "news-work",  label: "Editorial" },
                      { value: "mono-all",   label: "Terminal" }
                    ]}
                    onChange={(v) => setTweak("typePair", v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density}
                    options={[
                      { value: "compact", label: "Compact" },
                      { value: "regular", label: "Regular" },
                      { value: "roomy",   label: "Roomy" }
                    ]}
                    onChange={(v) => setTweak("density", v)} />
        <TweakRadio label="Hero" value={t.hero}
                    options={[
                      { value: "featured", label: "Current WIP" },
                      { value: "pile",     label: "From the pile" }
                    ]}
                    onChange={(v) => setTweak("hero", v)} />
        <TweakToggle label="Washi tape on cards" value={t.showTape}
                     onChange={(v) => setTweak("showTape", v)} />
      </TweaksPanel>
    </>
  );
}

/* Subtle fade on route change so navigation doesn't feel like a snap.
   Using opacity instead of transform on purpose — a `transform` value
   (even translateY(0)) creates a containing block for `position: fixed`
   descendants, which traps overlays like the Lightbox inside the route
   container and breaks full-viewport positioning. */
const __ROUTE_CSS = `
.route-fade { animation: rfade .28s ease-out both; }
@keyframes rfade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`;
const __routeStyle = document.createElement("style");
__routeStyle.textContent = __ROUTE_CSS;
document.head.appendChild(__routeStyle);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
