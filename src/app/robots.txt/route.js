export async function GET() {
    const content = `
User-agent: *
Disallow:

Sitemap: https://vicalinaofficial.uz/sitemap.xml
`.trim();

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
};