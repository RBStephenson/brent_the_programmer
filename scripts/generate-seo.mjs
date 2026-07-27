#!/usr/bin/env node
// Generates sitemap.xml, feed.xml, seo-jsonld.json, posts.json, and the
// embedded JSON-LD block in index.html, all from data.jsx's POSTS array —
// the single source of truth. Run after publishing/editing a post:
//
//   node scripts/generate-seo.mjs
//
// data.jsx is a browser script (assigns to `window`, not a module), so it's
// executed here in a vm sandbox with a stub `window` to extract POSTS
// without having to convert the site to real ES modules.

import { readFileSync, writeFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const ROOT = dirname(fileURLToPath(import.meta.url)) + "/..";
const SITE = "https://brenttheprogrammer.com";
const PORTRAIT = "assets/brent-portrait-web.jpg";

// Static, low-churn site identity — update by hand if bio/socials change.
const PERSON = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: "Brent Stephenson",
  alternateName: "brent_the_programmer",
  url: `${SITE}/`,
  description: "Backend engineer, miniature painter, and full-time caregiver.",
  sameAs: [
    "https://www.youtube.com/channel/UC0nUK7GE2y4qYskGsXiTh9g",
    "https://instagram.com/brent_the_programmer",
    "https://facebook.com/Brenttheprogrammer",
    "https://www.patreon.com/c/BrentStephenson",
  ],
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: "brent_the_programmer",
  description: "Miniature painting, self-care, and caregiving notes from the bench.",
  inLanguage: "en-US",
  publisher: { "@id": `${SITE}/#person` },
};

// Non-home routes worth their own sitemap entry (matches app.jsx's VALID list).
const ROUTES = [
  { route: "gallery", priority: "0.6", changefreq: "monthly" },
  { route: "studio", priority: "0.6", changefreq: "weekly" },
  { route: "blog", priority: "0.7", changefreq: "weekly" },
  { route: "about", priority: "0.5", changefreq: "yearly" },
  { route: "now", priority: "0.6", changefreq: "weekly" },
  { route: "awareness", priority: "0.5", changefreq: "yearly" },
];

function loadPosts() {
  const src = readFileSync(join(ROOT, "data.jsx"), "utf8");
  const sandboxWindow = {};
  const sandbox = { window: sandboxWindow, Object };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: "data.jsx" });
  if (!Array.isArray(sandboxWindow.POSTS)) {
    throw new Error("data.jsx did not assign POSTS to window — check the file wasn't restructured.");
  }
  return sandboxWindow.POSTS;
}

function imageFor(post) {
  return post.image ? post.image : PORTRAIT;
}

function imageByteLength(relPath) {
  try {
    return statSync(join(ROOT, relPath)).size;
  } catch {
    return 1; // asset not found on disk; keep the feed valid rather than failing the build
  }
}

function isoDate(iso) {
  return iso.slice(0, 10);
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function rfc822(iso) {
  // Preserves the ISO string's own offset (e.g. -04:00 -> -0400) instead of
  // converting to UTC, matching this site's existing Eastern-time convention.
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}):(\d{2})$/);
  if (!m) throw new Error(`Unexpected ISO datetime shape: ${iso}`);
  const [, y, mo, d, h, mi, s, offH, offM] = m;
  const weekday = DAYS[new Date(Date.UTC(+y, +mo - 1, +d)).getUTCDay()];
  return `${weekday}, ${d} ${MONTHS[+mo - 1]} ${y} ${h}:${mi}:${s} ${offH}${offM}`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildPostsJson(posts) {
  return posts.map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    cat: p.cat,
    image: imageFor(p),
    published: p.published,
    modified: p.modified || p.published,
  }));
}

function buildSitemap(posts) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    "  <url>",
    `    <loc>${SITE}/</loc>`,
    `    <lastmod>${isoDate(posts[0].published)}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    "    <priority>1.0</priority>",
    "  </url>",
  ];
  for (const r of ROUTES) {
    lines.push(
      "  <url>",
      `    <loc>${SITE}/?route=${r.route}</loc>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority}</priority>`,
      "  </url>"
    );
  }
  for (const p of posts) {
    lines.push(
      "  <url>",
      `    <loc>${SITE}/?post=${p.id}</loc>`,
      `    <lastmod>${isoDate(p.modified || p.published)}</lastmod>`,
      "    <changefreq>monthly</changefreq>",
      "    <priority>0.8</priority>",
      `    <image:image><image:loc>${SITE}/${imageFor(p)}</image:loc><image:title>${escapeXml(p.title)}</image:title></image:image>`,
      "  </url>"
    );
  }
  lines.push("</urlset>", "");
  return lines.join("\n");
}

function buildFeed(posts) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">',
    "  <channel>",
    "    <title>Brent the Programmer</title>",
    `    <link>${SITE}/</link>`,
    `    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
    "    <description>Miniature painting, self-care, and caregiving notes from the bench.</description>",
    "    <language>en-us</language>",
    `    <lastBuildDate>${rfc822(posts[0].published)}</lastBuildDate>`,
  ];
  for (const p of posts) {
    const rel = imageFor(p);
    const img = `${SITE}/${rel}`;
    const len = imageByteLength(rel);
    lines.push(
      "    <item>",
      `      <title>${escapeXml(p.title)}</title>`,
      `      <link>${SITE}/?post=${p.id}</link>`,
      `      <guid isPermaLink="true">${SITE}/?post=${p.id}</guid>`,
      `      <category>${escapeXml(p.cat)}</category>`,
      `      <pubDate>${rfc822(p.published)}</pubDate>`,
      `      <description><![CDATA[${p.excerpt}]]></description>`,
      `      <enclosure url="${img}" type="image/jpeg" length="${len}" />`,
      `      <media:content url="${img}" medium="image" type="image/jpeg" />`,
      `      <media:thumbnail url="${img}" />`,
      "    </item>"
    );
  }
  lines.push("  </channel>", "</rss>", "");
  return lines.join("\n");
}

function buildBlogPosting(p) {
  return {
    "@type": "BlogPosting",
    headline: p.title,
    url: `${SITE}/?post=${p.id}`,
    mainEntityOfPage: `${SITE}/?post=${p.id}`,
    datePublished: isoDate(p.published),
    dateModified: isoDate(p.modified || p.published),
    articleSection: p.cat,
    description: p.excerpt,
    image: `${SITE}/${imageFor(p)}`,
    author: { "@id": `${SITE}/#person` },
    publisher: { "@id": `${SITE}/#person` },
  };
}

function buildJsonLd(posts) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      WEBSITE,
      PERSON,
      {
        "@type": "Blog",
        "@id": `${SITE}/#blog`,
        url: `${SITE}/?route=blog`,
        name: "brent_the_programmer — journal",
        inLanguage: "en-US",
        author: { "@id": `${SITE}/#person` },
        publisher: { "@id": `${SITE}/#person` },
        blogPost: posts.map(buildBlogPosting),
      },
    ],
  };
}

function updateIndexHtml(jsonLd) {
  const path = join(ROOT, "index.html");
  const html = readFileSync(path, "utf8");
  const marker = '<script type="application/ld+json">\n';
  const start = html.indexOf(marker);
  if (start === -1) throw new Error("Couldn't find the JSON-LD <script> block in index.html");
  const bodyStart = start + marker.length;
  const end = html.indexOf("\n</script>", bodyStart);
  if (end === -1) throw new Error("Couldn't find the closing </script> for the JSON-LD block");
  const next = html.slice(0, bodyStart) + JSON.stringify(jsonLd) + html.slice(end);
  writeFileSync(path, next, "utf8");
}

function loadPreviousPublishedDates() {
  // Recovers `published` dates for posts that already had one in a prior run,
  // in case data.jsx got fully re-exported (e.g. from Claude Design) without
  // carrying that field over. Only genuinely new posts need a manual date.
  try {
    const prev = JSON.parse(readFileSync(join(ROOT, "posts.json"), "utf8"));
    return new Map(prev.map((p) => [p.id, p.published]));
  } catch {
    return new Map();
  }
}

function main() {
  const previousPublished = loadPreviousPublishedDates();
  const posts = loadPosts().map((p) =>
    p.published ? p : { ...p, published: previousPublished.get(p.id) }
  );

  const missing = posts.filter((p) => !p.published);
  if (missing.length) {
    throw new Error(
      `New post(s) with no "published" ISO date and no prior recorded one: ${missing
        .map((p) => p.id)
        .join(", ")}. Add e.g. published: "2026-07-27T12:00:00-04:00" to each in data.jsx.`
    );
  }

  posts.sort((a, b) => new Date(b.published) - new Date(a.published));

  writeFileSync(join(ROOT, "posts.json"), JSON.stringify(buildPostsJson(posts), null, 2) + "\n", "utf8");
  writeFileSync(join(ROOT, "sitemap.xml"), buildSitemap(posts), "utf8");
  writeFileSync(join(ROOT, "feed.xml"), buildFeed(posts), "utf8");
  const jsonLd = buildJsonLd(posts);
  writeFileSync(join(ROOT, "seo-jsonld.json"), JSON.stringify(jsonLd, null, 2) + "\n", "utf8");
  updateIndexHtml(jsonLd);

  console.log(`Generated posts.json, sitemap.xml, feed.xml, seo-jsonld.json, and updated index.html for ${posts.length} posts.`);
}

main();
