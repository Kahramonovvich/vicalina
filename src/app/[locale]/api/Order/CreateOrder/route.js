const BASE_URL = process.env.API_BASE_URL;

export async function POST(req) {
    try {
        const body = await req.json();

        const res = await fetch(`${BASE_URL}/api/Order/CreateOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            next: {
                revalidate: 60,
                tags: ['orders']
            }
        });

        const contentType = res.headers.get("content-type");

        // Пробуем вернуть как JSON если можно
        if (contentType && contentType.includes("application/json")) {
            const json = await res.json();

            if (!res.ok) {
                console.error("❌ Ошибка API:", json);
                return new Response(JSON.stringify(json), { status: res.status });
            }

            return Response.json(json);
        } else {
            // Если не JSON — вернём текст
            const text = await res.text();
            console.error("❌ Ответ не JSON:", text);
            return new Response(JSON.stringify({ error: text }), { status: res.status });
        }
    } catch (err) {
        console.error("💥 Ошибка сервера:", err);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        });
    }
}
