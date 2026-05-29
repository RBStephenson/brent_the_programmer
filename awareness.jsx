// ME/CFS awareness page for brent_the_programmer.
// Quiet, factual, in the same voice as the rest of the site. Keeps the focus
// on the condition; references "my wife and my son" without names or detail.
// Facts are sourced (CDC 2023 NHIS, Bateman Horne Center, IOM 2015, Solve M.E.)
// and attributions are shown inline. Global export: AwarenessPage.

const MECFS_SYMPTOMS = [
  {
    ix: "core",
    name: "Unrefreshing sleep",
    desc: "Sleep that doesn't restore. People wake as exhausted as when they lay down — sometimes more.",
  },
  {
    ix: "core",
    name: "Cognitive impairment",
    desc: "\u201CBrain fog\u201D — trouble finding words, holding a thought, following a conversation. Reading a few pages can be too much.",
  },
  {
    ix: "core",
    name: "Orthostatic intolerance",
    desc: "Standing up makes things worse — dizziness, racing heart, faintness. Being upright is itself an exertion.",
  },
  {
    ix: "common",
    name: "Profound fatigue",
    desc: "Not sleepiness. A bone-deep depletion that rest does not fix, lasting six months or far longer.",
  },
  {
    ix: "common",
    name: "Chronic pain",
    desc: "Headaches, muscle and joint aches, heightened sensitivity to touch, light, sound, and smell.",
  },
  {
    ix: "common",
    name: "Flu-like episodes",
    desc: "Sore throat, tender glands, a feeling of being perpetually ill — flaring after even small efforts.",
  },
];

const MECFS_STATS = [
  { num: "3.3M", lbl: "Americans estimated to live with ME/CFS — about 1.3% of adults.", src: "CDC / NCHS, 2023" },
  { num: "1 in 4", lbl: "are housebound or bedbound at some point in their illness.", src: "Bateman Horne Center" },
  { num: "~90%", lbl: "of people with ME/CFS have never been diagnosed.", src: "CDC" },
  { num: "0", lbl: "FDA-approved treatments. There is no cure — only careful management.", src: "IOM, 2015" },
];

const MECFS_RESOURCES = [
  {
    name: "#MEAction",
    host: "meaction.net",
    url: "https://www.meaction.net",
    desc: "International, patient-led network for advocacy, support, and awareness campaigns.",
  },
  {
    name: "Solve ME/CFS Initiative",
    host: "solvecfs.org",
    url: "https://solvecfs.org",
    desc: "Research, policy work, and patient resources — including first-person stories of living with the disease.",
  },
  {
    name: "Bateman Horne Center",
    host: "batemanhornecenter.org",
    url: "https://batemanhornecenter.org",
    desc: "Clinical care and education. Clear, practical guides for patients, caregivers, and clinicians.",
  },
  {
    name: "Open Medicine Foundation",
    host: "omf.ngo",
    url: "https://www.omf.ngo",
    desc: "Funds the biomedical research working toward real diagnostics and treatments.",
  },
  {
    name: "CDC — ME/CFS",
    host: "cdc.gov/me-cfs",
    url: "https://www.cdc.gov/me-cfs/",
    desc: "Federal overview: symptoms, diagnosis, and the basics of management.",
  },
];

function AwarenessPage({ go }) {
  return (
    <main className="shell" data-screen-label="ME/CFS awareness">
      {/* Hero */}
      <section className="awr-hero">
        <div className="eyebrow">awareness · myalgic encephalomyelitis</div>
        <h1>The illness my family lives with — <em>that most people have never heard of.</em></h1>
        <p className="lede">
          My wife and my son both live with ME/CFS. It is a serious, disabling,
          long-term illness, and it shapes every single day in our home.
        </p>
        <p className="lede">
          It's also one of the most misunderstood conditions there is — invisible,
          dismissed, and badly under-researched. This page is my small attempt to
          change that, one reader at a time.
        </p>
      </section>

      {/* What it is */}
      <section className="awr-section">
        <div className="awr-grid">
          <div>
            <div className="awr-kicker">01 · what it is</div>
            <h2>A real, physical, whole-body illness.</h2>
          </div>
          <div className="awr-prose">
            <p>
              <strong>ME/CFS</strong> stands for myalgic encephalomyelitis, also called
              chronic fatigue syndrome. The World Health Organization classifies it as a
              neurological disease. It affects the immune system, the nervous system,
              energy metabolism, and the way the body handles even ordinary activity.
            </p>
            <p>
              People with ME/CFS have been found to be <em>more functionally impaired</em>
              {" "}than people with conditions like multiple sclerosis, congestive heart
              failure, or late-stage kidney disease. It is not laziness, not deconditioning,
              and not depression — though it is often mistaken for all three.
            </p>
            <p>
              The most important thing to understand is the one symptom that defines it.
            </p>
          </div>
        </div>
      </section>

      {/* PEM hallmark */}
      <section className="awr-section">
        <div className="awr-pem">
          <div className="tag"><span className="dot"></span> the hallmark symptom</div>
          <h3>Post-exertional malaise <span className="abbr">— PEM</span></h3>
          <p>
            After even minor exertion — a shower, a short conversation, reading a few
            pages — symptoms don't just linger, they <strong>crash</strong>. The collapse
            is often delayed twelve to forty-eight hours, then can last days, weeks, or
            longer. Rest does not reliably bring function back.
          </p>
          <p>
            This is what separates ME/CFS from ordinary tiredness — and it's why
            <strong> "just push through it" is not only useless advice, it actively makes
            people sicker.</strong> Every activity has to be rationed against a budget of
            energy that healthy people never have to think about.
          </p>
        </div>
      </section>

      {/* Other symptoms */}
      <section className="awr-section">
        <div className="awr-kicker">02 · alongside the crashes</div>
        <h2>What else it brings.</h2>
        <div className="awr-symptoms">
          {MECFS_SYMPTOMS.map((s) => (
            <article key={s.name} className="awr-symptom">
              <div className="ix">{s.ix}</div>
              <h4>{s.name}</h4>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="awr-section">
        <div className="awr-kicker">03 · the scale of it</div>
        <h2>More common than people think. Far less understood.</h2>
        <div className="awr-stats" style={{ marginTop: 34 }}>
          {MECFS_STATS.map((s) => (
            <div key={s.lbl} className="awr-stat">
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
              <div className="src">{s.src}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why it's invisible */}
      <section className="awr-section">
        <div className="awr-grid">
          <div>
            <div className="awr-kicker">04 · the silent part</div>
            <h2>Why it stays invisible.</h2>
          </div>
          <div className="awr-prose">
            <p>
              There's usually no cast, no wheelchair in the photos people see, no obvious
              sign. Someone can look fine in a brief moment and pay for that moment in bed
              for the next three days. The worst of the illness happens where no one is
              watching.
            </p>
            <p>
              Because the symptoms don't show, patients are often disbelieved — told for
              years, sometimes decades, that it's anxiety, stress, or "all in their head."
              It is not. It is a recognized, physical illness. Being doubted on top of being
              sick is its own kind of exhausting.
            </p>
            <p>
              That's the whole reason a page like this matters. The first thing any of us
              can do is simply <em>believe people</em> — even when they look fine.
            </p>
          </div>
        </div>
      </section>

      {/* Caregiver note */}
      <section className="awr-section">
        <div className="awr-note">
          <div className="label">a note from me</div>
          <div className="body">
            <p>
              I'm not a doctor. I'm someone who loves two people who live with this every
              day, and who does the caregiving in between everything else.
            </p>
            <p>
              ME/CFS is a big part of why this site is the way it is — <strong>quiet, slow,
              built in small pieces</strong> around the rhythm of our days. Painting one
              thin layer at a time turned out to be a fitting hobby for a life that runs at
              that pace.
            </p>
            <p>
              If you take one thing from this page: believe people when they tell you
              they're sick, even when they look well. And if you're caring for someone
              with ME/CFS too — <strong>your own rest counts. You're allowed to have your
              own thing.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="awr-section">
        <div className="awr-kicker">05 · learn more</div>
        <h2>Better sources than me.</h2>
        <p className="awr-prose" style={{ marginTop: 14, color: "var(--ink-3)", fontSize: 14.5 }}>
          If anything here mattered to you, these are the people doing the real work —
          research, advocacy, clinical care, and support for patients and the people who
          look after them.
        </p>
        <div className="awr-resources">
          {MECFS_RESOURCES.map((r) => (
            <a key={r.name} className="awr-resource" href={r.url}
               target="_blank" rel="noopener noreferrer">
              <div className="top">
                <div className="name">{r.name}</div>
                <div className="host">{r.host}</div>
              </div>
              <div className="desc">{r.desc}</div>
              <div className="go">visit <Icon name="arrow" size={12} /></div>
            </a>
          ))}
        </div>

        <div className="awr-close">
          Look fine, feel awful. <span className="accent">Both can be true at once.</span>
        </div>
        <div className="awr-daynote">
          <span className="ribbon" aria-hidden="true"></span>
          International ME/CFS awareness day · may 12 · the ribbon is blue
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { AwarenessPage, MECFS_SYMPTOMS, MECFS_STATS, MECFS_RESOURCES });
