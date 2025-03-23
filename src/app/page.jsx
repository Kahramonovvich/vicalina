import AboutUs from "@/components/AboutUs";
import Categorys from "@/components/Categorys";
import OurPartners from "@/components/OurPartners";

export default function Home() {

  return (
    <div className="home">
      <AboutUs />
      <OurPartners />
      <Categorys />
    </div>
  )
}