import { NextResponse } from "next/server";

const rateLimit = new Map();

export function middleware(req) {
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();

    // Rate limit (5 сек)
    if (req.nextUrl.pathname.startsWith("/api")) {
        if (rateLimit.has(ip)) {
            const lastRequestTime = rateLimit.get(ip);
            if (now - lastRequestTime < 5000) {
                return new Response("Too Many Requests", { status: 429 });
            }
        }
        rateLimit.set(ip, now);
    }

    // 🔐 Защита /admin
    const path = req.nextUrl.pathname;
    const token = req.cookies.get("token")?.value;

    // Дебаг
    console.log("Middleware triggered for:", path);
    console.log("Token:", token);

    // Ограничим доступ к /admin без токена
    if (path === "/admin" || path.startsWith("/admin/")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

// 🎯 Настраиваем на нужные пути
export const config = {
    matcher: ["/api/:path*", "/admin", "/admin/:path*"],
};