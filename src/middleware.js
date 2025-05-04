import { NextResponse } from "next/server";

const rateLimit = new Map();
const PUBLIC_FILE = /\.(.*)$/;
const locales = ['uz', 'ru'];
const defaultLocale = 'uz';

export function middleware(req) {
    const url = req.nextUrl.clone();
    const path = url.pathname;

    // ===== 1. Rate limiting для API =====
    // const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "unknown";
    // const now = Date.now();

    // if (path.startsWith("/api")) {
    //     if (rateLimit.has(ip)) {
    //         const lastRequestTime = rateLimit.get(ip);
    //         if (now - lastRequestTime < 3000) {
    //             return new Response("Too Many Requests", { status: 429 });
    //         }
    //     }
    //     rateLimit.set(ip, now);
    // }

    // ===== 2. Admin защита =====
    const cookie = req.cookies.get('admin_token');
    let token = '';
    if (cookie) {
        const cookieData = JSON?.parse(cookie?.value);
        token = cookieData.token;
    };

    if ((path === "/ru/admin" || path === "/uz/admin" || path === "/admin" || path.startsWith("/admin/")) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // ===== 3. Локализация =====
    const isPublicFile = PUBLIC_FILE.test(path) || path.startsWith('/api') || path.includes('_next');

    const missingLocale = locales.every(
        (locale) => !path.startsWith(`/${locale}`) && path !== `/${locale}`
    );

    if (!isPublicFile && missingLocale) {
        url.pathname = `/${defaultLocale}${path}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};