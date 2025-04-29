import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { BasketProvider } from "@/context/basket-context";
import TopBanner from "@/components/Test";
import { productsSlug } from "@/utils/utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Vicalina – siz va oilangiz uchun!",
  description: "Vicalina – bu onlayn do‘kon, unda siz sifatli qozonlar, skavotkalar, oshxona naborlari, pichoqlar va boshqa oshxona buyumlarini xarid qilishingiz mumkin.",
  keywords: [
    "Vicalina",
    "qozonlar",
    "skavotkalar",
    "pichoqlar",
    "oshxona buyumlari",
    "internet do'kon",
    "oshxona anjomlari",
    "kastrulkalar",
    "naborlar",
    "maishiy texnika"
  ],
  metadataBase: new URL("https://vicalinaofficial.uz"),
  openGraph: {
    title: "Vicalina – siz va oilangiz uchun!",
    description: "Qozonlar, skavotkalar, pichoqlar va boshqa oshxona buyumlari – Vicalina onlayn do‘konida",
    url: "https://vicalinaofficial.uz",
    siteName: "Vicalina",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "https://vicalinaofficial.uz/favicon.jpg",
        width: 1080,
        height: 1080,
        alt: "Vicalina logotipi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vicalina – siz va oilangiz uchun!",
    description:
      "Qozonlar, skavotkalar, pichoqlar va boshqa oshxona buyumlari – Vicalina onlayn do‘konida",
    images: ["https://vicalinaofficial.uz/favicon.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
};

const BASE_URL = process.env.API_BASE_URL;

export default async function RootLayout({ children, params }) {

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
    <html lang="uz">
      <body className={dmSans.className}>
        <TopBanner languageId={languageId} />
        <BasketProvider>
          <Header languageId={languageId} products={productsWithSlug} />
          {children}
        </BasketProvider>
        <Footer languageId={languageId} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
};