import { navMenu } from "@/constants/constants";

const API_BASE_URL = process.env.API_BASE_URL;
const BASE_URL = "https://vicalinaofficial.uz";
const LANG_MAP = {
  uz: 1,
  ru: 2,
};

export async function GET() {
  try {
    const productMap = new Map();

    const urls = [
      staticUrl("/", "x-default", 1.0),
      staticUrl("/favorites", "x-default", 0.3),
      staticUrl("/basket", "x-default", 0.3),
      staticUrl("/catalog/all-products", "x-default", 0.9),
    ];

    const categoryMap = new Set();

    for (const [locale, languageId] of Object.entries(LANG_MAP)) {
      const products = await fetch(
        `${API_BASE_URL}/api/Products/GetAllProducts?languageId=${languageId}`
      ).then((res) => res.json());

      for (const product of products) {
        const category = navMenu.find(
          (cat) =>
            cat.name.toLowerCase() === product.category.toLowerCase() ||
            cat.nameRu.toLowerCase() === product.category.toLowerCase()
        );
        const categorySlug = category ? category.slug : "unknown-category";
        categoryMap.add(categorySlug);

        const productSlug = `${product.name.toLowerCase().replace(/\s+/g, "-")}-id~${product.id}`;
        const fullUrl = `${BASE_URL}/${locale}${categorySlug}/${productSlug}`;

        if (!productMap.has(product.id)) {
          productMap.set(product.id, {});
        }

        productMap.get(product.id)[locale] = fullUrl;
      }
    }

    for (const [_, versions] of productMap.entries()) {
      for (const [lang, href] of Object.entries(versions)) {
        const alternates = Object.entries(versions)
          .map(
            ([altLang, altHref]) =>
              `<xhtml:link rel="alternate" hreflang="${altLang}" href="${altHref}" />`
          )
          .join("\n");
        const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${href}" />`;
        urls.push(`
  <url>
    <loc>${href}</loc>
    ${alternates}
    ${xDefault}
    <priority>0.8</priority>
  </url>`);
      }
    }

    for (const category of categoryMap) {
      for (const locale of Object.keys(LANG_MAP)) {
        urls.push(staticUrl(`/${locale}${category}`, locale, 0.9));
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

function staticUrl(path, lang, priority = 0.7) {
  return `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${path}" />
    <priority>${priority}</priority>
  </url>`;
}