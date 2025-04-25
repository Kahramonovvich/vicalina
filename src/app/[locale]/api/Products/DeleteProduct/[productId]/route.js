import { cookies } from "next/headers";

const BASE_URL = process.env.API_BASE_URL;

export async function DELETE(request, { params }) {
    const { productId } = params;
    const { searchParams } = new URL(request.url);
    const languageId = searchParams.get('languageId') || 1;

    try {
        const cookieStore = cookies();
        const token = cookieStore.get('admin_token')?.value;

        const res = await fetch(
            `${BASE_URL}/api/Products/DeleteProduct?productId=${productId}&languageId=${languageId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            const text = await res.text();
            console.error('❌ Ошибка удаления продукта:', res.status, text);
            return new Response(JSON.stringify({ error: 'Ошибка удаления' }), {
                status: 500,
            });
        };

        if (res.ok) {
            revalidateTag('products');
        };

        const result = await res.json();
        return Response.json(result);
    } catch (err) {
        console.error('💥 Системная ошибка при удалении:', err);
        return new Response(JSON.stringify({ error: 'Ошибка сервера' }), {
            status: 500,
        });
    }
}