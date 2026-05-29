// Studio — a photo tour of Brent's work + play space.
// Honest, messy, his. Hero desk shot, then zone-by-zone photo essay,
// closing on the accidental self-portrait in the resin printer glass.

const STUDIO_ZONES = [
  {
    n: "01",
    id: "desk",
    title: "The desk",
    kicker: "work + play, same surface",
    img: "assets/studio/desk.jpg",
    orient: "wide",
    body:
      "This is the overlap — the day job and the hobby sharing one ultrawide and a cutting mat. " +
      "That's my own site up on the monitor, a Dr Pepper within reach, and a wet palette about six " +
      "inches from the keyboard. Code on the left, paint on the right. Most days I'm not entirely " +
      "sure which one I came in here to do.",
  },
  {
    n: "02",
    id: "paint-wall",
    title: "The paint wall",
    kicker: "every color I own (and a few I forgot)",
    img: "assets/studio/paint-wall.jpg",
    orient: "tall",
    body:
      "Airbrush bottles racked on the wall, Warpaints in the shelves, primed minis hiding in the " +
      "drawers. There is no organizational system here that survives contact with an actual painting " +
      "session. And yes — that sticker says DON'T EAT THE PAINT. It is there for a reason.",
  },
  {
    n: "03",
    id: "booth",
    title: "The airbrush booth",
    kicker: "the loud, fume-y end of things",
    img: "assets/studio/airbrush-booth.jpg",
    orient: "wide",
    body:
      "Out in the garage: the spray booth, the compressor, the ultrasonic cleaner, and the resin " +
      "printer humming away on the right. This is where primer happens, and where I tell myself I'll " +
      "clean the airbrush right after I'm done. Reader, I do not clean the airbrush right after.",
  },
  {
    n: "04",
    id: "display",
    title: "The display case",
    kicker: "the finished, the half-finished, the still-gray",
    img: "assets/studio/display-case.jpg",
    orient: "tall",
    body:
      "A lit cabinet of prints, busts, terrain, and the occasional finished piece — RoboCop, a " +
      "Superman bust, a castle that took three days to print. The little sign on the shelf is the " +
      "house philosophy in full: \u201CLook, I'm trying to rant here. Stop interrupting me with facts.\u201D",
  },
  {
    n: "05",
    id: "guitars",
    title: "The guitar wall",
    kicker: "the other hobby",
    img: "assets/studio/guitars.jpg",
    orient: "wide",
    body:
      "When the brush needs a rest and my hands want to make a different kind of noise, there's a " +
      "wall of guitars and a couple of Marshalls waiting. Same instinct as the painting, honestly — " +
      "slow down, make something, let the brain breathe. The calculus textbook is load-bearing.",
  },
];

function StudioPage({ go }) {
  return (
    <main className="shell studio" data-screen-label="Studio">
      {/* Hero */}
      <section className="studio-hero">
        <div className="studio-hero-copy">
          <div className="meta">section · studio · work, play &amp; a beautiful mess</div>
          <h1>The Studio<span className="ast">*</span></h1>
          <p className="studio-sub">
            <span className="ast">*</span> a total train wreck — and all mine. Where the day job and the
            hobby live in the same room, share the same desk, and occasionally fight over the
            same square foot of cutting mat.
          </p>
        </div>
        <figure className="studio-hero-img">
          <Placeholder label="the desk · code + paint" src="assets/studio/desk.jpg"
                       alt="The main desk: ultrawide monitor, keyboard, cutting mat, paints and a 3D printer tower"
                       aspect="16/10" style={{ borderRadius: 6 }} />
          <figcaption>The desk, on an ordinary Tuesday. No tidying for the photo.</figcaption>
        </figure>
      </section>

      {/* Zone-by-zone photo essay */}
      <div className="studio-zones">
        {STUDIO_ZONES.map((z, i) => (
          <section key={z.id} className={"studio-zone " + z.orient + (i % 2 ? " flip" : "")}>
            <figure className="studio-zone-img">
              <Placeholder label={z.title.toLowerCase()} src={z.img} alt={z.title}
                           aspect={z.orient === "tall" ? "3/4" : "4/3"}
                           style={{ borderRadius: 6 }} />
            </figure>
            <div className="studio-zone-copy">
              <div className="studio-num">{z.n}</div>
              <div className="studio-kicker">{z.kicker}</div>
              <h2>{z.title}</h2>
              <p>{z.body}</p>
            </div>
          </section>
        ))}
      </div>

      {/* Closing: the accidental self-portrait */}
      <section className="studio-maker">
        <figure>
          <Placeholder label="the maker · reflected in the resin printer"
                       src="assets/studio/maker.jpg"
                       alt="Brent reflected in the amber-lit glass of the resin printer"
                       aspect="3/4" style={{ borderRadius: 6 }} />
        </figure>
        <div className="studio-maker-copy">
          <div className="studio-kicker">the maker</div>
          <h2>The man in the machine.</h2>
          <p>
            That's me — caught in the amber glow of the resin printer one night, beard and gray hairs
            and a paint-stained shirt, looking down at whatever just finished curing. Nobody set this
            up. It's just the bench, late, the way it actually looks.
          </p>
          <p>
            This room is a work in progress, same as everything on the shelves. That feels about right.
          </p>
          <div className="studio-signoff">
            <span>Trust the process.</span>
            <span>Take care of yourself.</span>
            <span>One brushstroke at a time.</span>
          </div>
          <div className="studio-cta">
            <button className="btn accent" onClick={() => go("gallery")}>
              See what's on the bench <span className="arr"><Icon name="arrow" size={14} /></span>
            </button>
            <button className="btn ghost" onClick={() => go("about")}>
              Read the long version
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { StudioPage });
