const BASE_URL = process.env.API_BASE_URL;

export async function POST(req) {
    try {        
        const formData = await req.formData();
        console.log(formData);

        const res = await fetch(`${BASE_URL}/api/Products/CreateProduct`, {
            method: 'POST',
            body: formData,
        });

        const result = await res.json();

        console.log('res:', res);
        console.log('resust:', result);

        if (result.ok) {
            revalidateTag('products');
        } else {
            console.error(result);
            console.error(res);
        };

        return Response.json(result);
    } catch (error) {
        console.error('Mahsulot yaratishda xatolik:', error);
        return new Response(JSON.stringify({ error: 'Ошибка сервера' }), {
            status: 500,
        });
    };
};