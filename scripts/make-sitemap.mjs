import { writeFile } from "node:fs/promises";
import { SEO_BASE_URL, seoPages, planSeo, teamPages } from "../src/seoData.js";

const paths = [
  "/",
  ...seoPages.map((page) => `/${page.slug}`),
  ...Object.keys(planSeo).map((slug) => `/planos/${slug}`),
  ...teamPages.map((page) => `/${page.slug}`),
];

const urls = paths.map((path) =>
  `  <url><loc>${SEO_BASE_URL}${path === "/" ? "" : path}</loc><lastmod>2026-09-21</lastmod></url>`
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml, "utf8");
await writeFile(
  new URL("../public/robots.txt", import.meta.url),
  `User-agent: *\nAllow: /\n\nSitemap: ${SEO_BASE_URL}/sitemap.xml\n`,
  "utf8",
);
console.log(`${paths.length} URLs no sitemap.`);