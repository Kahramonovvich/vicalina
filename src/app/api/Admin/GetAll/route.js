const BASE_URL = process.env.API_BASE_URL;

export async function GET() {
    try {
        const res = await fetch(`${BASE_URL}/api/Admin/GetAll`, {
            next: {
                tags: ['admins'],
                revalidate: 60
            }
        });
        if (!res.ok) {
            const err = await res.text();
            console.error('API error:', res.status, err);
            return [];
        }
        return await res.json();
    } catch (err) {
        console.error('API fetch error:', err.message);
        return [];
    };
};