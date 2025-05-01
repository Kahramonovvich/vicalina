import { cookies } from "next/headers";

const BASE_URL = process.env.API_BASE_URL;

export async function POST(req) {
    try {
        const formData = await req.formData();
        
        const cookieStore = cookies();
        const cookie = cookieStore?.get('admin_token');
        const cookieData = JSON?.parse(cookie?.value);
        const token = cookieData?.token;

        const res = await fetch(`${BASE_URL}/api/Products/CreateProduct`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await res.json();

        if (result.ok) {
            revalidateTag('products');
        } else {
            console.error(result);
            console.error(res);
        };

        return Response.json(result);
    } catch (error) {
        console.error('Mahsulot yaratishda xatolik:', error);
        return new Response(JSON.stringify({ error: 'Ошибка сервера' }), {
            status: 500,
        });
    };
};