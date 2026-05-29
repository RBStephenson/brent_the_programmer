// All routes for brent_the_programmer.
// Globals: HomePage, GalleryPage, BlogPage, PostPage, AboutPage, NowPage,
// ContactPage.

/* ──────────────────────────────────────────────────────────────────────
   HOME
   ────────────────────────────────────────────────────────────────────── */
function HomePage({ go, openPost, hero }) {
  const featuredId = "diana";
  const featuredGallery = GALLERY.find((g) => g.id === featuredId);
  // "Latest from the bench" = the WIP, plus a few from the pile to show what's next.
  const wips = GALLERY.filter((g) => g.status === "wip");
  const pileSample = GALLERY.filter((g) => g.status === "pile").slice(0, 2);
  const latestBench = [...wips, ...pileSample].slice(0, 3);
  const featuredPost = POSTS[0];
  const pileCount = GALLERY.filter((g) => g.status === "pile").length;

  // Hero variant comes from a Tweak: "featured" (current WIP) or "pile" (a sample from the pile)
  const featured = hero === "pile"
    ? GALLERY.find((g) => g.status === "pile")
    : featuredGallery;

  return (
    <main>
      {/* Hero */}
      <section className="shell hero">
        <div>
          <div className="eyebrow">developer · caregiver · brand-new painter</div>
          <h1>
            A programmer's quiet hours,<br/>
            <em>learning to paint—and learning to slow down.</em>
          </h1>
          <p className="lede">
            I'm Brent: software developer, caregiver, and brand-new painter. I
            print and paint miniatures and 1:6&nbsp;scale figures, and I'm
            learning as I go—one brushstroke at a time.
          </p>
          <p className="lede" style={{ marginTop: 14 }}>
            This is a place to log the journey honestly: creativity, caregiving,
            self-care, and trusting the process… both at the desk and in life.
          </p>
          <div className="hero-meta">
            <span><span className="k">currently</span> diana the acrobat</span>
            <span><span className="k">on the desk</span> 1 model</span>
            <span><span className="k">in the pile</span> {pileCount} prints</span>
            <span><span className="k">scale</span> 1:6 only</span>
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn accent" onClick={() => go("gallery")}>
              See the pile <span className="arr"><Icon name="arrow" size={14} /></span>
            </button>
            <button className="btn ghost" onClick={() => go("blog")}>
              Read the journal
            </button>
          </div>
        </div>
        <aside className="hero-card">
          <div className="tape" aria-hidden="true"></div>
          <Placeholder label={featured.placeholder} src={featured.image} alt={featured.title}
                       aspect="4/5" style={{ borderRadius: 4 }} />
          <div className="label">
            <span>{featured.status === "wip" ? "currently on the desk" : "next in the pile"}</span>
            <span className="pill">
              {featured.status === "wip" ? "WIP" : "PILE"}
            </span>
          </div>
          <div className="title">{featured.title}</div>
          <div className="sub">{featured.factionLabel} · {featured.stage}</div>
        </aside>
      </section>

      {/* Pull quote — placeholder until I have something of my own to quote */}
      <section className="shell">
        <figure className="pullquote">
          <div className="rule"></div>
          <blockquote>
            "Taking care of yourself doesn't take away from the people you love. It helps you keep showing up."
            <cite>— from the journal</cite>
          </blockquote>
          <div className="rule"></div>
        </figure>
      </section>

      {/* Latest from the bench */}
      <section className="shell section">
        <div className="section-h">
          <div>
            <div className="num">01 · workshop</div>
            <h2>On the bench &amp; on deck</h2>
          </div>
          <div className="right">
            <a onClick={() => go("gallery")} style={{ cursor: "pointer", color: "var(--ink-2)" }}>
              all work <Icon name="arrow" size={12} />
            </a>
          </div>
        </div>
        <div className="bench">
          {latestBench.map((g) => (
            <article key={g.id} className="bench-item" onClick={() => go("gallery")}
                     style={{ cursor: "pointer" }}>
              <Placeholder label={g.placeholder} src={g.image} alt={g.title} />
              <div className="meta">
                <div className="title">{g.title}</div>
                <div className={`stat ${g.status}`}>{g.status === "wip" ? "WIP" : "PILE"}</div>
              </div>
              <div className="sub">{g.factionLabel} · {g.stage}</div>
            </article>
          ))}
        </div>
      </section>

      {/* Now + Latest post */}
      <section className="shell section">
        <div className="split">
          <div>
            <div className="section-h" style={{ marginBottom: 14 }}>
              <div>
                <div className="num">02 · now</div>
                <h2>On the desk</h2>
              </div>
              <div className="right">
                <a onClick={() => go("now")} style={{ cursor: "pointer", color: "var(--ink-2)" }}>
                  full now page <Icon name="arrow" size={12} />
                </a>
              </div>
            </div>
            <ul className="now-list">
              {NOW_PROJECTS.map((p) => (
                <li key={p.id}>
                  <div className="pct">{p.pct}%</div>
                  <div>
                    <div className="name">{p.title}</div>
                    <div className="sub">{p.cat}</div>
                  </div>
                  <div style={{ width: 80 }}>
                    <div className="bar"><i style={{ width: p.pct + "%" }} /></div>
                    <div className="eta" style={{ marginTop: 6 }}>{p.eta}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="section-h" style={{ marginBottom: 14 }}>
              <div>
                <div className="num">03 · journal</div>
                <h2>Latest post</h2>
              </div>
            </div>
            <article className="latest-post" onClick={() => openPost(featuredPost.id)}
                     style={{ cursor: "pointer" }}>
              <Placeholder label={featuredPost.placeholder} />
              <div className="cat">{featuredPost.cat}</div>
              <h3>{featuredPost.title}</h3>
              <p className="excerpt">{featuredPost.excerpt}</p>
              <div className="by">
                <span>{featuredPost.date}</span><span>·</span><span>{featuredPost.read} read</span>
              </div>
              <button className="btn ghost" style={{ alignSelf: "flex-start", marginTop: 4 }}>
                Read essay <span className="arr"><Icon name="arrow" size={14} /></span>
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* ME/CFS awareness callout — quiet, set slightly apart */}
      <section className="shell section">
        <div className="awr-callout">
          <div>
            <div className="eyebrow">why this site also exists</div>
            <h3>My wife and son live with ME/CFS.</h3>
            <p>
              It's a serious, disabling illness most people have never heard of —
              and a big part of why this site moves slowly and gently. If you have
              a minute, I'd love for you to understand it a little better.
            </p>
          </div>
          <button className="btn accent cta" onClick={() => go("awareness")}>
            Learn about ME/CFS <span className="arr"><Icon name="arrow" size={14} /></span>
          </button>
        </div>
      </section>

      {/* Socials */}
      <section className="shell section">
        <div className="section-h">
          <div>
            <div className="num">04 · elsewhere</div>
            <h2>Find me away from the desk</h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {SOCIALS.map((s) => <SocialCard key={s.id} social={s} />)}
        </div>
      </section>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   GALLERY
   ────────────────────────────────────────────────────────────────────── */
function GalleryPage() {
  const [faction, setFaction] = React.useState("all");
  const [status, setStatus] = React.useState("all"); // all | wip | pile
  const [openId, setOpenId] = React.useState(null);

  const items = GALLERY.filter((g) =>
    (faction === "all" || g.faction === faction) &&
    (status === "all" || g.status === status));

  const open = (id) => setOpenId(id);
  const close = () => setOpenId(null);
  const nav = (dir) => {
    const i = items.findIndex((g) => g.id === openId);
    if (i < 0) return;
    const next = (i + dir + items.length) % items.length;
    setOpenId(items[next].id);
  };

  React.useEffect(() => {
    if (!openId) return;
    document.body.classList.add("lb-open");
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") nav(-1);
      if (e.key === "ArrowRight") nav(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("lb-open");
    };
  }, [openId]);

  return (
    <main className="shell">
      <section style={{ padding: "56px 0 32px" }}>
        <div className="num smallcaps muted">section · gallery</div>
        <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(48px, 6vw, 84px)",
                     lineHeight: 1, letterSpacing: "-.02em", marginTop: 12, maxWidth: "16ch" }}>
          One on the bench. The rest, waiting.
        </h1>
        <p className="muted" style={{ marginTop: 18, maxWidth: "48ch", fontSize: 16, lineHeight: 1.55 }}>
          Everything here is a 1:6 scale resin print. Right now there's one WIP
          (Diana) and a pile of unstarted figures I want to paint. Click any
          piece to see notes from the bench. Filter by subject or status to
          narrow down.
        </p>
      </section>

      <div className="gallery-filters">
        <span className="lbl">subject</span>
        <div className="group">
          {FACTIONS.map((f) => (
            <button key={f.id}
                    className={`chip ${faction === f.id ? "active" : ""}`}
                    onClick={() => setFaction(f.id)}>{f.label}</button>
          ))}
        </div>
        <span className="lbl" style={{ marginLeft: 12 }}>status</span>
        <div className="group">
          {[{id:"all",l:"All"},{id:"wip",l:"WIP"},{id:"pile",l:"In the pile"}].map((s) => (
            <button key={s.id}
                    className={`chip ${status === s.id ? "active" : ""}`}
                    onClick={() => setStatus(s.id)}>{s.l}</button>
          ))}
        </div>
        <span className="count">{items.length} {items.length === 1 ? "piece" : "pieces"}</span>
      </div>

      {/* Grouped sections: WIP first, then everything in the pile.
          When the user has filtered to a single status, one section is
          empty and is silently skipped. */}
      {(() => {
        const wips  = items.filter((g) => g.status === "wip");
        const piles = items.filter((g) => g.status === "pile");

        const renderCard = (g) => (
          <article key={g.id} className="gallery-card"
                   onClick={() => open(g.id)}>
            <Placeholder label={g.placeholder} src={g.image} alt={g.title} />
            <div className={`tag ${g.status === "wip" ? "wip" : ""}`}>
              {g.status === "wip" ? "WIP" : "In the pile"}
            </div>
            <div className="overlay">
              <div>
                <div className="ovr-title">{g.title}</div>
                <div className="ovr-sub">{g.factionLabel}</div>
              </div>
            </div>
          </article>
        );

        return (
          <>
            {wips.length > 0 && (
              <section className="gallery-section">
                <header className="gallery-section-h">
                  <span className="num">01 · on the bench</span>
                  <h2>Currently painting</h2>
                  <span className="ct">{wips.length}</span>
                </header>
                <div className="gallery-grid">{wips.map(renderCard)}</div>
              </section>
            )}
            {piles.length > 0 && (
              <section className="gallery-section">
                <header className="gallery-section-h">
                  <span className="num">02 · in the pile</span>
                  <h2>Printed, awaiting paint</h2>
                  <span className="ct">{piles.length}</span>
                </header>
                <div className="gallery-grid">{piles.map(renderCard)}</div>
              </section>
            )}
            {items.length === 0 && (
              <p className="muted" style={{ padding: "32px 0" }}>
                Nothing matches that filter yet.
              </p>
            )}
          </>
        );
      })()}

      {openId && (
        <Lightbox
          item={GALLERY.find((g) => g.id === openId)}
          onClose={close}
          onPrev={() => nav(-1)}
          onNext={() => nav(1)}
        />
      )}
    </main>
  );
}

/* ── Lightbox: piece detail ────────────────────────────────────────────── */
function Lightbox({ item, onClose, onPrev, onNext }) {
  return (
    <div className="lb-back" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lb-head">
        <div>
          <div className="ttl">{item.title}</div>
          <div className="meta">{item.factionLabel} · {item.stage}</div>
        </div>
        <button className="lb-close" onClick={onClose} aria-label="close"><Icon name="close" size={18} /></button>
      </div>
      <div className="lb-body">
        <div className="lb-stage">
          <button className="lb-stage-close" onClick={onClose} aria-label="close">
            <Icon name="close" size={16} /><span>Close</span>
          </button>
          <button className="nav-arrow prev" onClick={onPrev} aria-label="previous"><Icon name="chevL" size={18} /></button>
          <button className="nav-arrow next" onClick={onNext} aria-label="next"><Icon name="chevR" size={18} /></button>
          <Placeholder label={item.placeholder} src={item.image} alt={item.title} fit="contain" />
        </div>
        <aside className="lb-side">
          <div className="cat">{item.factionLabel}</div>
          <h3>{item.title}</h3>

          <dl className="spec">
            <dt>Status</dt><dd>{item.status === "wip" ? "Work in progress" : "In the pile · awaiting paint"}</dd>
            <dt>Stage</dt><dd>{item.stage}</dd>
            <dt>Scale</dt><dd>1:6 · ~12 in.</dd>
            <dt>STL by</dt><dd>{item.designer}</dd>
          </dl>
          <p className="notes">{item.notes}</p>
          <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 12 }}>
            <button className="btn ghost" style={{ flex: 1, justifyContent: "center" }}
                    onClick={onPrev}>
              <Icon name="chevL" size={14}/> Previous
            </button>
            <button className="btn ghost" style={{ flex: 1, justifyContent: "center" }}
                    onClick={onNext}>
              Next <Icon name="chevR" size={14}/>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   BLOG INDEX
   ────────────────────────────────────────────────────────────────────── */
function BlogPage({ openPost }) {
  const [tag, setTag] = React.useState("all");
  // Build counts per tag
  const tagSet = ["all", ...new Set(POSTS.flatMap((p) => p.tags))];
  const tagCount = (t) => t === "all" ? POSTS.length : POSTS.filter((p) => p.tags.includes(t)).length;
  const list = tag === "all" ? POSTS : POSTS.filter((p) => p.tags.includes(tag));
  const [featured, ...rest] = list;
  const published = POSTS.filter((p) => p.body && p.body.length > 0).length;
  const drafts = POSTS.length - published;

  return (
    <main className="shell">
      <section className="blog-hero">
        <div>
          <div className="meta">section · journal · self-care, caregiving &amp; the bench</div>
          <h1>Creativity, caregiving, and trusting the process.</h1>
          <p className="excerpt">
            Honest write-ups about burnout, caregiving, and learning to make
            space for myself—plus notes from the bench as I figure out
            painting. Start with the first essay below.
          </p>
          <div className="by">
            <span>{published} published</span> · <span>{drafts} drafts in progress</span> · <span>RSS coming</span>
          </div>
        </div>
        <Placeholder label="hero shot · open journal + wet palette" />
      </section>

      <div className="blog-tags">
        {tagSet.map((t) => (
          <button key={t}
                  className={`blog-tag ${tag === t ? "active" : ""}`}
                  onClick={() => setTag(t)}>
            {t === "all" ? "All essays" : t}
            <span className="ct">{tagCount(t)}</span>
          </button>
        ))}
      </div>

      {/* Featured row */}
      {featured && (
        <article className="blog-row" onClick={() => openPost(featured.id)}
                 style={{ borderTop: "1px solid var(--rule)" }}>
          <div className="ix">{featured.body && featured.body.length ? "ESSAY" : "DRAFT"}</div>
          <div>
            <h3>{featured.title}</h3>
            <p className="excerpt">{featured.excerpt}</p>
            <div className="row-meta">{featured.cat} · {featured.date} · {featured.read} read</div>
          </div>
          <Placeholder label={featured.placeholder} aspect="4/3" style={{ borderRadius: 4 }} />
        </article>
      )}

      {/* Rest */}
      <div className="blog-list">
        {rest.map((p, i) => (
          <article key={p.id} className="blog-row" onClick={() => openPost(p.id)}>
            <div className="ix">№ {String(i + 2).padStart(2, "0")}</div>
            <div>
              <h3>{p.title}</h3>
              <p className="excerpt">{p.excerpt}</p>
              <div className="row-meta">{p.cat} · {p.date} · {p.read} read</div>
            </div>
            <Placeholder label={p.placeholder} aspect="4/3" style={{ borderRadius: 4 }} />
          </article>
        ))}
      </div>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   POST (detail)
   ────────────────────────────────────────────────────────────────────── */
function PostPage({ post, go, openPost }) {
  const idx = POSTS.findIndex((p) => p.id === post.id);
  const prev = POSTS[idx - 1];
  const next = POSTS[idx + 1];
  const isDraft = !post.body || post.body.length === 0;

  const headings = (post.body || [])
    .filter((b) => b.startsWith("## "))
    .map((b) => b.replace(/^##\s+/, ""));

  // Render markdown-lite body: ## h2, > blockquote, otherwise paragraph
  const blocks = (post.body || []).map((b, i) => {
    if (b.startsWith("## ")) return <h2 key={i}>{b.replace(/^##\s+/, "")}</h2>;
    if (b.startsWith("> "))  return <blockquote key={i}>{b.replace(/^>\s+/, "")}</blockquote>;
    if (b === "~~signoff") return (
      <div className="post-signoff" key={i}>
        <span>Trust the process.</span>
        <span>Take care of yourself.</span>
        <span>One brushstroke at a time.</span>
      </div>
    );
    return <p key={i}>{b}</p>;
  });

  return (
    <main className="shell">
      <article>
        <header className="post-hero">
          <div className="crumbs">
            <a onClick={() => go("home")} style={{ cursor: "pointer" }}>~</a>
            <span className="sep">/</span>
            <a onClick={() => go("blog")} style={{ cursor: "pointer" }}>journal</a>
            <span className="sep">/</span>
            <span>{post.id}.md</span>
          </div>
          <div className="cat">{post.cat}</div>
          <h1>{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
          <div className="meta">
            <span>By Brent · brent_the_programmer</span>
            <span>{post.date}</span>
            <span>{post.read} read</span>
            <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
              <Icon name="link" size={11} /> share
            </span>
          </div>
        </header>

        <Placeholder label={post.placeholder} className="post-feature" />

        <div className="post-body">
          <aside className="post-aside">
            <span className="smallcaps">In this essay</span>
            <ul>
              {headings.length === 0
                ? <li><a>(no sections)</a></li>
                : headings.map((h, i) => <li key={i}><a>{h}</a></li>)}
            </ul>
            <div className="share">
              <button className="hicon" aria-label="share"><Icon name="link" size={13} /></button>
              <button className="hicon" aria-label="bookmark"><Icon name="rss" size={13} /></button>
              <button className="hicon" aria-label="email"><Icon name="mail" size={13} /></button>
            </div>
            <div style={{ marginTop: 28 }}>
              <span className="smallcaps">Tagged</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                {post.tags.map((t) => <span key={t} className="tag-pill">{t}</span>)}
              </div>
            </div>
          </aside>
          <div className="post-prose">
            {isDraft ? (
              <>
                <div className="draft-banner"
                     style={{
                       padding: "16px 18px",
                       border: "1px dashed var(--rule)",
                       borderRadius: "var(--radius)",
                       background: "var(--paper-2)",
                       marginBottom: 24,
                       fontFamily: "var(--f-mono)",
                       fontSize: 12,
                       letterSpacing: ".06em",
                       textTransform: "uppercase",
                       color: "var(--ink-3)",
                     }}>
                  draft · not written yet
                </div>
                <p>{post.excerpt}</p>
                <p className="muted" style={{ fontSize: 14.5 }}>
                  This is a seed for an essay I want to write once there's
                  something real to say. When it lands, this page will fill in.
                </p>
              </>
            ) : (
              <>
                {blocks}
                <div className="sig">— brent · written at the bench, with a wet palette drying out next to me</div>
              </>
            )}
          </div>
        </div>

        <div className="post-next">
          {prev ? (
            <div className="card" onClick={() => openPost(prev.id)}>
              <div className="lbl"><Icon name="chevL" size={11} /> Older</div>
              <div className="ttl">{prev.title}</div>
            </div>
          ) : <div />}
          {next ? (
            <div className="card" onClick={() => openPost(next.id)} style={{ textAlign: "right" }}>
              <div className="lbl">Newer <Icon name="chevR" size={11} /></div>
              <div className="ttl">{next.title}</div>
            </div>
          ) : <div />}
        </div>
      </article>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   ABOUT
   ────────────────────────────────────────────────────────────────────── */
function AboutPage({ go }) {
  const pileCount = GALLERY.filter((g) => g.status === "pile").length;
  const wipCount  = GALLERY.filter((g) => g.status === "wip").length;
  const facts = [
    { num: wipCount,        lbl: "On the bench",   sub: "Diana the Acrobat." },
    { num: pileCount,       lbl: "In the pile",    sub: "Printed, awaiting paint." },
    { num: "0",             lbl: "Finished",       sub: "Soon. Hopefully." },
    { num: "1:6",           lbl: "Scale of choice", sub: "Big enough to see what I'm doing." },
  ];
  return (
    <main className="shell">
      <section className="about-hero">
        <div>
          <div className="mono smallcaps" style={{ color: "var(--ink-3)" }}>section · about</div>
          <h1 style={{ marginTop: 12 }}>
            Hey — I'm Brent. Backend engineer by trade, painter by hobby, caregiver every day.
          </h1>
          <p className="lede">
            I'm 51. By day I work in tech — mostly backend systems and
            architecture. I've spent years building software and untangling the
            occasional legendary mess. For a long time I figured my hands only
            really knew keyboards. Turns out… they needed paint too.
          </p>
          <div style={{ marginTop: 26, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn accent" onClick={() => go("gallery")}>
              See the pile <span className="arr"><Icon name="arrow" size={14} /></span>
            </button>
            <button className="btn ghost" onClick={() => go("now")}>What I'm on now</button>
          </div>
        </div>
        <Placeholder src="assets/brent-portrait-web.jpg" alt="Brent — bearded, in his D&D 'husband, chaotic good' tee, painted minis and guitars behind him" label="about · Brent at the bench" aspect="4/5" style={{ borderRadius: 4 }} />
      </section>

      <section className="about-facts">
        {facts.map((f) => (
          <div key={f.lbl} className="about-fact">
            <div className="num">{f.num}</div>
            <div className="lbl">{f.lbl}</div>
            <div className="sub">{f.sub}</div>
          </div>
        ))}
      </section>

      <section className="about-body">
        <div>
          <h3>The short version</h3>
          <p className="muted" style={{ fontSize: 13.5 }}>Updated May 2026 · written in one sitting</p>
        </div>
        <div>
          <p>
            What started with a 3D printer and "I'll just print some D&amp;D
            minis for the family campaign I'm still trying to write" somehow
            turned into shelves of miniatures and 1:6 scale figures, brushes
            scattered across the desk, and me learning an entirely different
            kind of problem solving.
          </p>
          <p>
            Painting taught me something coding never quite could: patience.
            Paint needs time to dry. Layers need time to build. Sometimes a
            piece looks rough halfway through and your brain wants to call it a
            failure — then you keep going, trust the process, and something
            starts to click.
          </p>
          <p>
            That lesson landed deeper because life at home already asks for a
            lot of patience. My wife and my son both live with ME/CFS, a
            disabling chronic illness that affects every part of daily life.
            Caregiving is part of our rhythm here. Some days are steady. Some
            days change fast. Plans move, energy shifts, and we adapt.{" "}
            <a onClick={() => go("awareness")}
               style={{ color: "var(--accent)", cursor: "pointer", borderBottom: "1px solid currentColor" }}>
              More about ME/CFS, and why it matters here →
            </a>
          </p>
          <p>
            In the middle of all that, creativity became something important
            for me. Not productivity. Not "hustle." Not another thing to
            optimize. Just creating — painting a miniature, working on a figure,
            learning something new, and letting my brain breathe.
          </p>
          <p>
            This site is a place for that: a quiet log of what I'm working on,
            what I'm learning, what went sideways, and what surprised me. It's
            also for caregivers. If you're caring for someone you love — it's
            okay to have your own thing. It's okay to make space for joy. Taking
            care of yourself doesn't take away from the people you love; it
            helps you keep showing up. And honestly? The people we care for
            usually want that for us more than we realize.
          </p>
          <p>
            So this space is about miniatures, figures, painting, creativity,
            caregiving, self-care, and trusting the process — both on the desk
            and in life. Glad you're here.
          </p>
          <p className="mono" style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 24 }}>
            $ whoami<br/>
            brent_the_programmer · backend engineer · painter · caregiver · trusting the process
          </p>
        </div>
      </section>

      <section style={{ padding: "32px 0 56px", borderTop: "1px solid var(--rule)" }}>
        <div className="about-shelf-label">A few things sitting in the pile</div>
        <div className="about-shelf">
          {GALLERY.filter((g) => g.status === "pile").slice(0, 6).map((g) => (
            <Placeholder key={g.id} label={g.title.toLowerCase()} src={g.image} alt={g.title} />
          ))}
        </div>
      </section>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   NOW
   ────────────────────────────────────────────────────────────────────── */
function NowPage() {
  return (
    <main className="shell">
      <section className="now-hero">
        <div>
          <div className="mono smallcaps" style={{ color: "var(--ink-3)" }}>section · now</div>
          <h1 style={{ marginTop: 12 }}>What I'm working on, right now.</h1>
          <p className="lede">
            A snapshot of the bench this week — a
            <span className="mono"> /now</span> page. Right now there's
            one model on the desk — everything else is in the pile.
          </p>
        </div>
        <div>
          <div className="updated">last updated: may 26, 2026 · 21:47</div>
          <div className="updated" style={{ color: "var(--accent)", marginTop: 6 }}>
            <span className="mono">●</span> open at the desk now
          </div>
        </div>
      </section>

      <section className="now-projects">
        {NOW_PROJECTS.map((p) => (
          <article key={p.id} className="now-project">
            <Placeholder label={p.placeholder} src={p.image} alt={p.title} />
            <div>
              <div className="cat">{p.cat}</div>
              <h3>{p.title}</h3>
              <p className="desc">{p.desc}</p>
              <div className="stages">
                {p.stages.map((s, i) => {
                  const cls = i < p.current ? "stage done" : i === p.current ? "stage cur" : "stage";
                  return <span key={i} className={cls}>{s}</span>;
                })}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="pct-big">{p.pct}<span style={{ fontSize: 24 }}>%</span></div>
              <div className="eta">{p.eta}</div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   ADOPT — curated view of finished pieces from the gallery
   ────────────────────────────────────────────────────────────────────── */
function AdoptPage({ openLightbox }) {
  const [filter, setFilter] = React.useState("all"); // all | available | reserved | adopted

  // Source of truth is the gallery — only pieces with an adopt status that
  // isn't "keep" appear here.
  const pool = GALLERY.filter((g) => g.adopt && g.adopt !== "keep");
  const counts = {
    all: pool.length,
    available: pool.filter((s) => s.adopt === "available").length,
    reserved:  pool.filter((s) => s.adopt === "reserved").length,
    adopted:   pool.filter((s) => s.adopt === "adopted").length,
  };
  const items = filter === "all" ? pool : pool.filter((s) => s.adopt === filter);

  const [inquireId, setInquireId] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const inquireItem = inquireId ? pool.find((s) => s.id === inquireId) : null;
  const close = () => { setInquireId(null); setSubmitted(false); };

  return (
    <main className="shell">
      <section className="com-hero">
        <div className="mono smallcaps" style={{ color: "var(--ink-3)" }}>section · adopt · finished pieces</div>
        <h1 style={{ marginTop: 12 }}>A few pieces, looking for a home.</h1>
        <p className="lede">
          I don't take commissions — the moment a hobby has a deadline it stops
          being self-care. But every so often I finish a piece I'm willing to
          part with. When that happens, it ends up here, waiting to be adopted.
        </p>
        <p className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 18, letterSpacing: ".06em", textTransform: "uppercase" }}>
          $ ls ./adopt · {counts.available} available · {counts.reserved} reserved · {counts.adopted} adopted
        </p>
      </section>

      <div className="shop-bar">
        <div className="shop-bar-group">
          {[
            { id: "all",       l: "All" },
            { id: "available", l: "Available" },
            { id: "reserved",  l: "Reserved" },
            { id: "adopted",   l: "Adopted · archive" },
          ].map((s) => (
            <button key={s.id}
                    className={`shop-chip ${filter === s.id ? "active" : ""}`}
                    onClick={() => setFilter(s.id)}>
              {s.l}<span className="ct">{counts[s.id]}</span>
            </button>
          ))}
        </div>
        <div className="shop-bar-meta mono">
          shipping worldwide · usps + dhl · everything here is ready to ship
        </div>
      </div>

      <section className="shop-grid">
        {items.map((s) => (
          <article key={s.id} className={`shop-card ${s.adopt}`}>
            <Placeholder label={s.placeholder} aspect="4/5" style={{ borderRadius: 4 }} />
            <div className={`shop-status ${s.adopt}`}>
              {s.adopt === "available" && <><i className="dot" /> Available</>}
              {s.adopt === "reserved"  && <><i className="dot" /> Reserved</>}
              {s.adopt === "adopted"   && <>Adopted · archive</>}
            </div>
            <div className="shop-cat">{s.factionLabel}</div>
            <h3 className="shop-title">{s.title}</h3>
            <p className="shop-notes">{s.adoptNote || s.notes}</p>
            <dl className="shop-spec">
              <dt>Finished</dt><dd>{s.updated}</dd>
              {s.hours && <><dt>Hours</dt><dd>{s.hours} h logged</dd></>}
              <dt>Includes</dt><dd>Display base · care notes</dd>
            </dl>
            <div className="shop-foot">
              <div className="shop-price">{s.price}</div>
              <button className={`btn ${s.adopt === "available" ? "accent" : "ghost"}`}
                      disabled={s.adopt === "adopted"}
                      onClick={() => setInquireId(s.id)}>
                {s.adopt === "available" && <>Adopt <span className="arr"><Icon name="arrow" size={13}/></span></>}
                {s.adopt === "reserved"  && "Join waitlist"}
                {s.adopt === "adopted"   && "Adopted"}
              </button>
            </div>
            {s.adoptedBy && <p className="adopted-by mono">{s.adoptedBy}</p>}
          </article>
        ))}
      </section>

      {/* How this works */}
      <section className="shop-explain">
        <div className="section-h">
          <div>
            <div className="num">how it works</div>
            <h2>Adopting a piece</h2>
          </div>
        </div>
        <div className="shop-steps">
          <div className="shop-step">
            <div className="num-big">01</div>
            <h4>You inquire</h4>
            <p>Tap <em>Adopt</em> on a piece. I'll confirm it's still available and we'll talk shipping.</p>
          </div>
          <div className="shop-step">
            <div className="num-big">02</div>
            <h4>I send photos</h4>
            <p>Fresh, well-lit images from all angles — and any honest paint chips or imperfections. No surprises.</p>
          </div>
          <div className="shop-step">
            <div className="num-big">03</div>
            <h4>We agree, then I ship</h4>
            <p>Invoiced via Stripe or PayPal. Packaged in foam-cut boxes I've used for two years. Insured.</p>
          </div>
          <div className="shop-step">
            <div className="num-big">04</div>
            <h4>It's yours</h4>
            <p>Returns within 14 days, no questions. Touch-up paint pots included so it ages with you, not on me.</p>
          </div>
        </div>
      </section>

      {/* Stay-in-the-loop + say hi */}
      <section className="shop-cta">
        <div>
          <div className="num smallcaps muted">first dibs</div>
          <h3 className="serif" style={{ fontSize: 32, lineHeight: 1.1, marginTop: 8, maxWidth: "14ch" }}>
            New pieces drop here first.
          </h3>
          <p className="muted" style={{ marginTop: 12, fontSize: 14.5, maxWidth: "38ch" }}>
            The mailing list gets a heads-up the day before anything lists publicly.
            A piece is usually adopted within a week — but it's always quieter to subscribers.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 18, display: "flex", gap: 8, maxWidth: 360 }}>
            <input type="email" placeholder="you@example.com"
                   style={{ flex: 1, padding: "10px 12px", border: "1px solid var(--rule)", borderRadius: 4,
                            background: "var(--paper)", color: "inherit", font: "14px var(--f-body)", outline: "none" }} />
            <button className="btn accent">Subscribe</button>
          </form>
        </div>
        <div>
          <div className="num smallcaps muted">or just say hi</div>
          <p className="muted" style={{ marginTop: 12, fontSize: 14.5, maxWidth: "36ch" }}>
            Not adopting, just curious about a piece or want to talk about caregiving?
            All four of these inboxes are open.
          </p>
          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            {SOCIALS.map((s) => <SocialCard key={s.id} social={s} />)}
            <SocialCard social={{ id: "mail", label: "Email", handle: "hi@brentprogrammer.dev" }} />
          </div>
        </div>
      </section>

      {/* Inquiry modal */}
      {inquireItem && (
        <div className="inq-overlay" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="inq-modal">
            <div className="inq-head">
              <div>
                <div className="mono smallcaps" style={{ color: "var(--ink-3)" }}>
                  {inquireItem.adopt === "available" ? "adopting" : "join waitlist for"}
                </div>
                <div className="serif" style={{ fontSize: 26, lineHeight: 1.1, marginTop: 4 }}>{inquireItem.title}</div>
                <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
                  {inquireItem.factionLabel} · {inquireItem.price}
                </div>
              </div>
              <button className="lb-close" onClick={close} aria-label="close"><Icon name="close" size={18}/></button>
            </div>
            <div className="inq-body">
              {submitted ? (
                <div className="submitted">
                  <div className="h">Got it — I'll be in touch.</div>
                  <div className="b">I reply within a few days. Usually after the kids are in bed.</div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <label>Your name</label>
                  <input type="text" placeholder="how should I address you" />
                  <label>Email</label>
                  <input type="email" placeholder="you@something.com" />
                  <label>Shipping to (country)</label>
                  <input type="text" placeholder="United States, UK, etc." />
                  <label>Anything I should know?</label>
                  <textarea placeholder="Gift? Display vs. play? Specific shipping date?" />
                  <button type="submit" className="btn accent"
                          style={{ width: "100%", justifyContent: "center", padding: 13 }}>
                    {inquireItem.adopt === "available" ? "Send inquiry" : "Add me to the waitlist"}
                    <span className="arr"><Icon name="arrow" size={14}/></span>
                  </button>
                  <p className="hint" style={{ marginTop: 10, textAlign: "center" }}>
                    No payment yet — this just opens a conversation.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

Object.assign(window, {
  HomePage, GalleryPage, BlogPage, PostPage, AboutPage, NowPage, AdoptPage,
});
