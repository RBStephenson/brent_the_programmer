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
    // Scroll to top on navigation but keep current scroll position if same route
    if (r !== route) window.scrollTo({ top: 0, behavior: "instant" });
  };
  const openPost = (id) => {
    setPostId(id);
    setRoute("post");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const toggleTheme = () => setTweak("theme", t.theme === "studio" ? "workshop" : "studio");

  const currentPost = postId ? POSTS.find((p) => p.id === postId) : null;

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
