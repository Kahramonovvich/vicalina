import AboutUs from "@/components/AboutUs";
import Categorys from "@/components/Categorys";
import DiscountedProducts from "@/components/DiscountedProducts";
import NewProducts from "@/components/NewProducts";
import OurPartners from "@/components/OurPartners";
import TopProducts from "@/components/TopProducts";
import { products } from "@/constants/constants";
import { productsSlug } from "@/utils/utils";

export default async function Home() {

  const productsWithSlug = productsSlug(products);

  return (
    <div className="home">
      <AboutUs />
      <OurPartners />
      <Categorys />
      <TopProducts products={productsWithSlug} />
      <NewProducts products={productsWithSlug} />
      <DiscountedProducts products={productsWithSlug} />
    </div>
  )
}