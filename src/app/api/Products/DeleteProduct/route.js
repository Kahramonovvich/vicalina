import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
const BASE_URL = process.env.API_BASE_URL;

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') || 1;

    try {
        const cookieStore = await cookies();
        const cookie = cookieStore?.get('admin_token');
        const token = cookie?.value;

        const res = await fetch(`${BASE_URL}/api/Products/DeleteProduct?productId=${productId}`,
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