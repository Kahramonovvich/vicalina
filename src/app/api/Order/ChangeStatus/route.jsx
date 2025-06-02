import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
const BASE_URL = process.env.API_BASE_URL;

export async function PATCH(request) {

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");

    const cookieStore = cookies();
    const cookie = cookieStore?.get('admin_token');
    const cookieData = JSON?.parse(cookie?.value);
    const token = cookieData?.token;

    try {
        const res = await fetch(`${BASE_URL}/api/Order/ChangeStatus/${orderId}?status=${status}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (res.ok) {
            revalidateTag('orders');
        };

        if (!res.ok) {
            return new Response("Failed to update order status", { status: res.status });
        };

        const data = await res.json();
        return Response.json(data);

    } catch (error) {
        console.error("Error updating order status:", error);
        return new Response("Server error", { status: 500 });
    };
};