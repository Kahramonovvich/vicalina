import { NextResponse } from 'next/server';
const BASE_URL = process.env.API_BASE_URL;

export async function POST(req) {
    try {
        const { searchParams } = new URL(req.url);

        const rating = searchParams.get('rating');
        const productId = searchParams.get('productId');

        if (!rating || !productId) {
            return new NextResponse(JSON.stringify({ error: 'Rating va productId kerak' }), { status: 400 });
        }

        const res = await fetch(`${BASE_URL}/api/Rating/CalculateRating?rating=${rating}&productId=${productId}`, {
            method: 'POST',
        });

        const result = await res.json();

        return NextResponse.json(result);
    } catch (error) {
        console.error('❌ Rating server error:', error);
        return new NextResponse(JSON.stringify({ error: 'Serverda xatolik' }), { status: 500 });
    }
};