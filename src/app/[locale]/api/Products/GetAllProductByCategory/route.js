import { cookies } from "next/headers";

const BASE_URL = process.env.API_BASE_URL;

export async function GET(request, { params }) {
    const { categoryName } = params;
    const { searchParams } = new URL(request.url);
    const languageId = searchParams.get('languageId') || 1;

    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin_token')?.value;

        const res = await fetch(
            `${BASE_URL}/api/Products/GetAllProductByCategory/${categoryName}?languageId=${languageId}`, {
            next: {
                tags: ['products'],
                revalidate: 60
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('Ошибка запроса:', res.status, err);
            return new Response(JSON.stringify({ error: 'Ошибка получения продуктов по категории' }), {
                status: 500,
            });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        console.error('Серверная ошибка:', error);
        return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), {
            status: 500,
        });
    };
};