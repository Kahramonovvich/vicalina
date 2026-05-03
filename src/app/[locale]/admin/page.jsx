import { productsSlug } from "@/utils/utils";
import Admin from "./Admin";
import { cookies } from "next/headers";
const BASE_URL = process.env.API_BASE_URL;

export default async function page({ params }) {

    const { locale } = await params;
    const langMap = { uz: "uzb", ru: "ru", en: "en" };
    const languageId = langMap[locale] || "uzb";

    const cookieStore = await cookies();
    const cookie = cookieStore?.get('admin_token');
    let token = '';
    try {
        if (cookie) {
            token = cookie.value;
        } else {
            console.log('🚫 NO TOKEN FOUND IN COOKIES');
        };
    } catch (e) {
        console.error('Ошибка парсинга cookie:', cookie?.value);
    };

    const resProducts = await fetch(`${BASE_URL}/api/Products/GetAllProducts?language=${languageId}`, {
        next: { tags: ['products'] }
    });

    const text = await resProducts.text();
    let products;

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
            orders={orders}
        />
    )
};