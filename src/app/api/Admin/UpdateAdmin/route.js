import { revalidateTag } from 'next/cache';
const BASE_URL = process.env.API_BASE_URL;

export async function PUT(request) {
    try {
        const formData = await request.formData();

        const res = await fetch(`${BASE_URL}/api/Admin/UpdateAdmin`, {
            method: 'PUT',
            body: formData,
        });

        const result = await res.json();

        if (result === true) {
            revalidateTag('admins');
        };

        return Response.json(result);
    } catch (error) {
        console.error('Ошибка обновления админа:', error);
        return new Response(JSON.stringify({ error: 'Ошибка сервера' }), {
            status: 500,
        });
    };
};