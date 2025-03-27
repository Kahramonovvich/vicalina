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
import { getAllProducts } from "/lib/api";

export default async function Home() {

  const products = await getAllProducts();
  const productsWithSlug = productsSlug(products);

  return (
    <div className="home">
      <AboutUs />
      <OurPartners />
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