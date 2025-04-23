import AboutUs from "@/components/AboutUs";
import Categorys from "@/components/Categorys";
import DiscountedProducts from "@/components/DiscountedProducts";
import ForKitchen from "@/components/ForKitchen";
import MostNeedComponent from "@/components/MostNeedComponent";
import NewProducts from "@/components/NewProducts";
import OurPartners from "@/components/OurPartners";
import StaticCommentsComponent from "@/components/StaticCommentsComponent";
import TopProducts from "@/components/TopProducts";
import { productsSlug } from "@/utils/utils";
const BASE_URL = process.env.API_BASE_URL;

export default async function Home({ params }) {

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

  return (
    <div className="home">
      <AboutUs />
      {/* <OurPartners /> */}
      <Categorys />
      <TopProducts products={productsWithSlug} />
      <NewProducts products={productsWithSlug} />
      <DiscountedProducts products={productsWithSlug} />
      <ForKitchen products={productsWithSlug} />
      <StaticCommentsComponent />
      <MostNeedComponent products={productsWithSlug} />
    </div>
  )
}