import { cookies } from "next/headers";

const BASE_URL = process.env.API_BASE_URL;

export async function GET(request, { params }) {
    const { productId } = params;
    const { searchParams } = new URL(request.url);
    const languageId = searchParams.get('languageId') || 1;

    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin_token')?.value;

        const res = await fetch(
            `${BASE_URL}/api/Products/GetProductById?languageId=${languageId}&productId=${productId}`, {
            next: {
                tags: ['products'],
                revalidate: 60
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("❌ Ошибка получения продукта:", res.status, errorText);
            return new Response(JSON.stringify({ error: "Ошибка получения продукта" }), {
                status: 500,
            });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (err) {
        console.error("💥 Системная ошибка:", err);
        return new Response(JSON.stringify({ error: "Ошибка сервера" }), {
            status: 500,
        });
    }
};