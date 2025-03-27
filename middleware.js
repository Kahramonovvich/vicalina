import { NextResponse } from "next/server";

const rateLimit = new Map();

export function middleware(req) {
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();

    if (rateLimit.has(ip)) {
        const lastRequestTime = rateLimit.get(ip);
        if (now - lastRequestTime < 5000) {
            return new Response("Too Many Requests", { status: 429 });
        }
    }

    rateLimit.set(ip, now);
    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};