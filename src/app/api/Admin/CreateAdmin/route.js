import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
const BASE_URL = process.env.API_BASE_URL;

export async function POST(req) {
    try {
        const formData = await req.formData();

        const cookieStore = cookies();
        const token = cookieStore.get('admin_token')?.value;

        const res = await fetch(`${BASE_URL}/api/Admin/CreateAdmin`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await res.json();

        if (res.ok) {
            revalidateTag('admins');
        }

        return Response.json(result);
    } catch (error) {
        console.error('Ошибка при создании админа:', error);
        return new Response(JSON.stringify({ error: 'Ошибка сервера' }), {
            status: 500,
        });
    };
};