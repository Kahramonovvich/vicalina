import { productsSlug } from "@/utils/utils";
import Admin from "./Admin";
import { cookies } from "next/headers";
const BASE_URL = process.env.API_BASE_URL;

export default async function page({ params }) {

    const locale = await params?.locale;
    const langMap = { uz: 1, ru: 2 };
    const languageId = langMap[locale] || 1;

    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;

    const resProducts = await fetch(`${BASE_URL}/api/Products/GetAllProducts?languageId=${languageId}`, {
        next: { tags: ['products'] }
    });

    const text = await resProducts.text();
    let products;

    try {
        products = JSON.parse(text);
    } catch (e) {
        console.error('Ошибка парсинга JSON:', text);
        products = [];
    };

    const resAdmin = await fetch(`${BASE_URL}/api/Admin/GetAll`, {
        next: { tags: ['admins'] },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const admins = await resAdmin.json();
    const productsWithSlug = await productsSlug(products);

    return (
        <Admin
            products={productsWithSlug}
            admins={admins}
            languageId={languageId}
            token={token}
        />
    )
}