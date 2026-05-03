import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.API_BASE_URL;

export async function POST(req) {
    try {
        const formData = await req.formData();

        const cookieStore = await cookies();
        const cookie = cookieStore.get('admin_token');

        if (!cookie?.value) {
            return Response.json(
                { message: 'Token topilmadi' },
                { status: 401 }
            );
        }

        const token = cookie.value;

        if (!token) {
            return Response.json(
                { message: 'Token yaroqsiz' },
                { status: 401 }
            );
        }

        const res = await fetch(`${BASE_URL}/api/Products/CreateProduct`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const result = await res.json();

        if (!res.ok) {
            console.error('API error:', result);

            return Response.json(
                {
                    message: result?.message || 'Mahsulot yaratilmadi',
                    error: result,
                },
                { status: res.status }
            );
        }

        revalidateTag('products');

        return Response.json(result);
    } catch (error) {
        console.error('Mahsulot yaratishda xatolik:', error);

        return Response.json(
            {
                message: 'Serverda xatolik yuz berdi',
                error: error?.message,
            },
            { status: 500 }
        );
    }
}