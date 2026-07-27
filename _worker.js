// Cloudflare Worker: injects per-page <head> meta (title, description, OG/Twitter
// tags with hero-image-else-portrait fallback, canonical, JSON-LD) into the HTML
// BEFORE it reaches the client, since Discord/Twitter/Facebook/Slack/etc. unfurl
// bots fetch raw HTML and never run the client-side meta-rewriting in app.jsx.
//
// The site is a single-page app where every route is `/` + a query string
// (?post=<id> or ?route=<name>), so there's only ever one static document
// (index.html) to rewrite — no path-based routing needed here.
//
// posts.json is generated from data.jsx by scripts/generate-seo.mjs — run that
// after publishing/editing a post, then redeploy.

import posts from "./posts.json";

const SITE = "https://brenttheprogrammer.com";
const PORTRAIT = `${SITE}/assets/brent-portrait-web.jpg`;

// Keep in sync with app.jsx's ROUTE_META (client-side copy, used post-hydration).
const ROUTE_META = {
  home: {
    title: "brent_the_programmer — hobby, self-care, miniatures",
    description:
      "Brent — backend engineer, miniature painter, and full-time caregiver. Painting minis one thin layer at a time, self-care, and raising awareness of ME/CFS.",
  },
  gallery: {
    title: "Gallery — brent_the_programmer",
    description:
      "The painted miniatures — D&D cartoon heroes, comic and anime characters, and sci-fi figures, painted one thin layer at a time.",
  },
  studio: {
    title: "The Studio — brent_the_programmer",
    description: "Inside the studio — works in progress, tools, and process notes from the workbench.",
  },
  blog: {
    title: "Journal — brent_the_programmer",
    description: "Essays on caregiving, self-care, and miniature painting — quiet notes from the bench.",
  },
  about: {
    title: "About — brent_the_programmer",
    description: "About Brent — backend engineer, miniature painter, and full-time caregiver.",
  },
  now: {
    title: "Now — brent_the_programmer",
    description: "What's on the desk right now — the current works in progress.",
  },
  awareness: {
    title: "ME/CFS Awareness — brent_the_programmer",
    description:
      "What myalgic encephalomyelitis (ME/CFS) is and why it matters — the disabling illness my wife and son live with.",
  },
};

const POSTS_BY_ID = new Map(posts.map((p) => [p.id, p]));

function metaForUrl(url) {
  const postId = url.searchParams.get("post");
  if (postId) {
    const post = POSTS_BY_ID.get(postId);
    if (!post) return null; // unknown post id — serve the page untouched
    return {
      title: `${post.title} — brent_the_programmer`,
      description: post.excerpt,
      image: `${SITE}/${post.image}`,
      imageAlt: post.title,
      url: `${SITE}/?post=${post.id}`,
      type: "article",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        url: `${SITE}/?post=${post.id}`,
        mainEntityOfPage: `${SITE}/?post=${post.id}`,
        datePublished: post.published.slice(0, 10),
        dateModified: (post.modified || post.published).slice(0, 10),
        articleSection: post.cat,
        description: post.excerpt,
        image: `${SITE}/${post.image}`,
        author: { "@type": "Person", name: "Brent Stephenson", url: `${SITE}/` },
      },
    };
  }

  const routeParam = url.searchParams.get("route");
  const route = ROUTE_META[routeParam] ? routeParam : "home";
  const m = ROUTE_META[route];
  return {
    title: m.title,
    description: m.description,
    image: PORTRAIT,
    imageAlt: "Brent — bearded, smiling, with painted miniatures and guitars behind him.",
    url: route === "home" ? `${SITE}/` : `${SITE}/?route=${route}`,
    type: "website",
    jsonLd: null, // non-post pages keep index.html's existing full Person/WebSite/Blog graph
  };
}

class SetText {
  constructor(text) {
    this.text = text;
  }
  element(el) {
    el.setInnerContent(this.text);
  }
}

class SetAttr {
  constructor(attr, value) {
    this.attr = attr;
    this.value = value;
  }
  element(el) {
    el.setAttribute(this.attr, this.value);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    const meta = metaForUrl(url);
    if (!meta) return response;

    let rewriter = new HTMLRewriter()
      .on("title", new SetText(meta.title))
      .on('meta[name="description"]', new SetAttr("content", meta.description))
      .on('meta[property="og:title"]', new SetAttr("content", meta.title))
      .on('meta[property="og:description"]', new SetAttr("content", meta.description))
      .on('meta[property="og:url"]', new SetAttr("content", meta.url))
      .on('meta[property="og:image"]', new SetAttr("content", meta.image))
      .on('meta[property="og:image:alt"]', new SetAttr("content", meta.imageAlt))
      .on('meta[property="og:type"]', new SetAttr("content", meta.type))
      .on('meta[name="twitter:title"]', new SetAttr("content", meta.title))
      .on('meta[name="twitter:description"]', new SetAttr("content", meta.description))
      .on('meta[name="twitter:image"]', new SetAttr("content", meta.image))
      .on('link[rel="canonical"]', new SetAttr("href", meta.url));

    if (meta.jsonLd) {
      rewriter = rewriter.on('script[type="application/ld+json"]', new SetText(JSON.stringify(meta.jsonLd)));
    }

    return rewriter.transform(response);
  },
};
