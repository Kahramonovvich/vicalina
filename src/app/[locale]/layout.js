import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { BasketProvider } from "@/context/basket-context";
import TopBanner from "@/components/Test";
import { productsSlug } from "@/utils/utils";
import NextTopLoader from "nextjs-toploader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata({ params }) {

  const locale = await params?.locale;
  const isRu = locale === 'ru';

  return {
    title: isRu ? "Vicalina — для вас и вашей семьи!" : "Vicalina – siz va oilangiz uchun!",
    description: isRu
      ? "Vicalina — интернет-магазин, где вы можете купить качественные казаны, сковородки, кухонные наборы, ножи и другую кухонную утварь."
      : "Vicalina – bu onlayn do‘kon, unda siz sifatli qozonlar, skavotkalar, oshxona naborlari, pichoqlar va boshqa oshxona buyumlarini xarid qilishingiz mumkin.",
    keywords: isRu
      ? [
        "Vicalina",
        "казаны",
        "сковородки",
        "ножи",
        "кухонная утварь",
        "интернет магазин",
        "кухонные принадлежности",
        "кастрюли",
        "наборы посуды",
        "бытовая техника"
      ]
      : [
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
    alternates: {
      canonical: `https://vicalinaofficial.uz/${locale}`,
      languages: {
        'uz-UZ': 'https://vicalinaofficial.uz/uz',
        'ru-RU': 'https://vicalinaofficial.uz/ru',
        'x-default': 'https://vicalinaofficial.uz/',
      },
    },
    openGraph: {
      title: isRu ? "Vicalina — для вас и вашей семьи!" : "Vicalina – siz va oilangiz uchun!",
      description: isRu
        ? "Казаны, сковородки, ножи и другие кухонные товары — в интернет-магазине Vicalina"
        : "Qozonlar, skavotkalar, pichoqlar va boshqa oshxona buyumlari – Vicalina onlayn do‘konida",
      url: "https://vicalinaofficial.uz",
      siteName: "Vicalina",
      locale: isRu ? "ru_RU" : "uz_UZ",
      type: "website",
      images: [
        {
          url: "https://vicalinaofficial.uz/favicon.ico",
          width: 1080,
          height: 1080,
          alt: "Vicalina logotipi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isRu ? "Vicalina — для вас и вашей семьи!" : "Vicalina – siz va oilangiz uchun!",
      description: isRu
        ? "Казаны, сковородки, ножи и другие кухонные товары — в интернет-магазине Vicalina"
        : "Qozonlar, skavotkalar, pichoqlar va boshqa oshxona buyumlari – Vicalina onlayn do‘konida",
      images: ["https://vicalinaofficial.uz/favicon.ico"],
    },
    viewport: "width=device-width, initial-scale=1",
  };
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
    <html lang={locale}>
      <body className={dmSans.className}>
        <NextTopLoader
          color="#000066"
          height={3}
          showSpinner={false}
        />
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