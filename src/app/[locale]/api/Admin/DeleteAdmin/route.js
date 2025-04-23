import { revalidateTag } from 'next/cache';
const BASE_URL = process.env.API_BASE_URL;

export async function DELETE(request) {
    const formData = await request.formData();

    try {
        const res = await fetch(`${BASE_URL}/api/Admin/DeleteAdmin`, {
            method: 'DELETE',
            body: formData,
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