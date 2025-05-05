import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
const BASE_URL = process.env.API_BASE_URL;

export async function DELETE(request) {
    const formData = await request.formData();

    const cookieStore = cookies();
    const cookie = cookieStore?.get('admin_token');
    const cookieData = JSON?.parse(cookie?.value);
    const token = cookieData?.token;

    try {
        const res = await fetch(`${BASE_URL}/api/Admin/DeleteAdmin`, {
            method: 'DELETE',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await res.json();

        if (result === true) {
            revalidateTag('admins');
        }

        return Response.json(result);
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Ошибка на сервере' }), {
            status: 500,
        });
    };
};