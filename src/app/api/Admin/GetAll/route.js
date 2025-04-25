import { cookies } from 'next/headers';

const BASE_URL = process.env.API_BASE_URL;

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin_token')?.value;
        
        console.log('token', token);

        const res = await fetch(`${BASE_URL}/api/Admin/GetAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: {
                tags: ['admins'],
                revalidate: 60,
            },
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('API error:', res.status, err);
            return new Response(JSON.stringify([]), { status: res.status });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (err) {
        console.error('API fetch error:', err.message);
        return new Response(JSON.stringify([]), { status: 500 });
    }
};