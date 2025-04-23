import { cookies } from 'next/headers';

const BASE_URL = process.env.API_BASE_URL;

export async function POST(req) {
    try {
        const body = await req.json();

        const res = await fetch(`${BASE_URL}/api/Auth/loginForAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        const token = data.token;
        if (!token) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
        }

        const cookieStore = await cookies();
        cookieStore?.set({
            name: 'admin_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24,
        });

        return Response.json({ success: true });
    } catch (err) {
        console.error('LOGIN ERROR:', err);
        return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
    }
}