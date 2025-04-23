import { cookies } from 'next/headers';
const BASE_URL = process.env.API_BASE_URL;

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);
        const res = await fetch(`${BASE_URL}/api/Auth/loginForAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        console.log('🚀 BACKEND DATA:', data);

        const token = data?.token;
        console.log('🔥 TOKEN:', token);

        if (!token) {
            console.log('🚫 NO TOKEN, NOT SETTING COOKIE');
            return new Response("Unauthorized", { status: 401 });
        }

        const cookieStore = cookies();
        cookieStore?.set({
            name: 'admin_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 2,
        });

        return Response.json({ success: true });
    } catch (err) {
        console.error('LOGIN ERROR:', err);
        return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
    }
}