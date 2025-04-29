const BASE_URL = process.env.API_BASE_URL;

export async function POST(req) {
    try {
        const body = await req.json();

        const res = await fetch(`${BASE_URL}/api/Comment/Create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            revalidateTag('products');
        };

        const data = await res.json();

        return Response.json(data);
    } catch (err) {
        console.error('Comment create error:', err);
        return new Response(JSON.stringify({ error: 'Serverda xatolik' }), { status: 500 });
    }
};