import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.API_BASE_URL;

export async function PUT(req) {
    try {
        const formData = await req.formData();

        const cookieStore = cookies();
        const cookie = cookieStore?.get('admin_token');
        const cookieData = JSON?.parse(cookie?.value);
        const token = cookieData?.token;

        const res = await fetch(`${BASE_URL}/api/Products/UpdateProduct`, {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await res.json();
        revalidateTag('products');

        return Response.json(result);
    } catch (error) {
        console.error('Mahsulot yangilashda xatolik:', error);
        return new Response(JSON.stringify({ error: 'Ошибка сервера' }), {
            status: 500,
        });
    };
};