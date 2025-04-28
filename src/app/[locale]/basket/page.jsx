import { productsSlug } from '@/utils/utils'
import BasketClient from './Basket'
const BASE_URL = process.env.API_BASE_URL;

export default async function BasketPage({ params }) {

  const locale = await params?.locale;
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
  };
  const productsWithSlug = await productsSlug(products);

  return <BasketClient products={productsWithSlug} languageId={languageId} />
};