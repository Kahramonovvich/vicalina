import { cookies } from "next/headers";

const BASE_URL = process.env.API_BASE_URL;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const languageId = searchParams.get('languageId') || 1;

    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin_token')?.value;

        const res = await fetch(`${BASE_URL}/api/Products/GetAllProducts?languageId=${languageId}`, {
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
            console.error('Ошибка запроса к .NET API:', res.status, err);
            return new Response(JSON.stringify({ error: 'Ошибка получения продуктов' }), {
                status: 500,
            });
        }

        const text = await res.text();
        let data;

        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Ожидали JSON, но получили:', text);
            return new Response(JSON.stringify({ error: 'Неверный формат данных от сервера' }), {
                status: 500,
            });
        }

        return Response.json(data);
    } catch (error) {
        console.error('Ошибка на сервере:', error);
        return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), {
            status: 500,
        });
    };
};