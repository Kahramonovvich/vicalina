import { navMenu } from "@/constants/constants";

const API_BASE_URL = process.env.API_BASE_URL;
const BASE_URL = 'https://vicalinaofficial.uz';
const LANG_MAP = {
    uz: 1,
    ru: 2,
};

export async function GET() {
    try {
        const urls = [];

        for (const [locale, languageId] of Object.entries(LANG_MAP)) {
            const products = await fetch(
                `${API_BASE_URL}/api/Products/GetAllProducts?languageId=${languageId}`
            ).then(res => res.json());

            urls.push(`<url><loc>${BASE_URL}</loc></url>`);
            urls.push(`<url><loc>${BASE_URL}/favorites</loc></url>`);
            urls.push(`<url><loc>${BASE_URL}/basket</loc></url>`);
            urls.push(`<url><loc>${BASE_URL}/catalog/all-products</loc></url>`);

            const categorySet = new Set();

            for (const product of products) {
                const category = navMenu.find(
                    (cat) =>
                        cat.name.toLowerCase() === product.category.toLowerCase() ||
                        cat.nameRu.toLowerCase() === product.category.toLowerCase()
                );
                const categorySlug = category ? category.slug : 'unknown-category';

                categorySet.add(categorySlug);

                const productSlug = `${product.name.toLowerCase().replace(/\s+/g, '-')}-id~${product.id}`;
                urls.push(
                    `<url><loc>${BASE_URL}/${locale}${categorySlug}/${productSlug}</loc></url>`
                );
            };

            for (const category of categorySet) {
                urls.push(`<url><loc>${BASE_URL}/${locale}${category}</loc></url>`);
            };
        };

        return new Response(
            `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join('\n')}
        </urlset>`,
            {
                headers: {
                    'Content-Type': 'application/xml',
                },
            }
        );
    } catch (err) {
        console.error('Sitemap generation error:', err);
        return new Response('Internal Server Error', { status: 500 });
    };
};