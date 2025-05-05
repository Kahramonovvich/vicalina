import { productsSlug } from "@/utils/utils";
import Admin from "./Admin";
import { cookies } from "next/headers";
const BASE_URL = process.env.API_BASE_URL;

export default async function page({ params }) {

    const locale = await params?.locale;
    const langMap = { uz: 1, ru: 2 };
    const languageId = langMap[locale] || 1;

    const cookieStore = cookies();
    const cookie = cookieStore?.get('admin_token');
    let cookieData = {};
    try {
        cookieData = JSON.parse(cookie?.value || '{}');
    } catch (e) {
        console.error('Ошибка парсинга cookie:', cookie?.value);
    };
    const token = cookieData?.token;
    const expiresAt = cookieData?.expiresAt;

    const resProducts = await fetch(`${BASE_URL}/api/Products/GetAllProducts?languageId=${languageId}`, {
        next: { tags: ['products'] }
    });

    const text = await resProducts.text();
    let products;

    console.log('resProducts.status:', resProducts.status);
    console.log('resProducts text:', text);

    try {
        products = JSON.parse(text);
    } catch (e) {
        console.error('Ошибка парсинга Products JSON:', text);
        products = [];
    };

    const resAdmin = await fetch(`${BASE_URL}/api/Admin/GetAll`, {
        next: { tags: ['admins'] },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const resOrders = await fetch(`${BASE_URL}/api/Order/GetAllOrders`, {
        next: { tags: ['orders'] },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const textOrder = await resOrders.text();
    let orders;

    try {
        orders = JSON.parse(textOrder);
    } catch (e) {
        console.error('Ошибка парсинга Order JSON:', textOrder);
        orders = [];
    };

    const admins = await resAdmin.json();
    const productsWithSlug = await productsSlug(products);

    return (
        <Admin
            products={productsWithSlug}
            admins={admins}
            languageId={languageId}
            token={token}
            expiresAt={expiresAt}
            orders={orders}
        />
    )
};