import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SEO_BASE_URL, seoPages, planSeo, teamPages } from "../src/seoData.js";

const dist = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(dist);
const template = await readFile(new URL("index.html", dist), "utf8");
const mapsUrl = "https://www.google.com/maps/place/Cuidary+-+Hospital+Veterin%C3%A1rio+24+horas/@-20.6744341,-44.0668394,1384m/data=!3m1!1e3!4m6!3m5!1s0xa16ddd87db6107:0xdc00b321d6ce76b0!8m2!3d-20.672873!4d-44.064612!16s%2Fg%2F11nvvbs1vf";
const business = (url) => ({
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  "@id": `${SEO_BASE_URL}/#hospital`,
  name: "Cuidary - Hospital Veterinário 24 horas",
  url,
  telephone: "+55 31 9911-6515",
  taxID: "58.545.751/0001-73",
  hasMap: mapsUrl,
  sameAs: ["https://www.instagram.com/cuidary.oficial/"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Nossa Sra. das Brotas, 179",
    addressLocality: "Entre Rios de Minas",
    addressRegion: "MG",
    postalCode: "35490-000",
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: -20.672873, longitude: -44.064612 },
  openingHours: "Mo-Su 00:00-23:59",
});
const escapeAttr = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
const routeEntries = [
  ...seoPages.map((page) => ({
    path: `/${page.slug}`,
    title: page.title,
    description: page.description,
    schema: [
      business(`${SEO_BASE_URL}/${page.slug}`),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  })),
  ...Object.entries(planSeo).map(([slug, page]) => ({
    path: `/planos/${slug}`,
    title: page.title,
    description: page.description,
    schema: [
      business(`${SEO_BASE_URL}/planos/${slug}`),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.name,
        url: `${SEO_BASE_URL}/planos/${slug}`,
        provider: { "@id": `${SEO_BASE_URL}/#hospital` },
        areaServed: { "@type": "City", name: "Entre Rios de Minas" },
      },
    ],
  })),
  ...teamPages.map((page) => ({
    path: `/${page.slug}`,
    title: page.title,
    description: page.description,
    schema: [
      business(`${SEO_BASE_URL}/${page.slug}`),
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: page.name,
        jobTitle: page.role,
        worksFor: { "@id": `${SEO_BASE_URL}/#hospital` },
      },
    ],
  })),
];

const replaceMeta = (html, entry) => {
  const canonical = `${SEO_BASE_URL}${entry.path}`;
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${entry.title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeAttr(entry.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeAttr(entry.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeAttr(entry.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<script id="seo-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="seo-jsonld" type="application/ld+json">${JSON.stringify(entry.schema)}</script>`);
};
for (const entry of routeEntries) {
  const output = join(distPath, entry.path.replace(/^\//, ""), "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, replaceMeta(template, entry), "utf8");
}

console.log(`${routeEntries.length} páginas SEO pré-renderizadas com metadados próprios.`);
