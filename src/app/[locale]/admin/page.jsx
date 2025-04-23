import { productsSlug } from "@/utils/utils";
import Admin from "./Admin";
import { headers } from "next/headers";
const BASE_URL = process.env.API_BASE_URL;

export default async function page() {

    const locale = headers()?.get('x-nextjs-locale');
    const langMap = { uz: 1, ru: 2 };
    const languageId = langMap[locale] || 1;
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
    }

    const resAdmin = await fetch(`${BASE_URL}/api/Admin/GetAll`, {
        next: { tags: ['admins'] }
    });
    const admins = await resAdmin.json();
    const productsWithSlug = await productsSlug(products);

    return (
        <Admin
            products={productsWithSlug}
            admins={admins}
            languageId={languageId}
        />
    )
}