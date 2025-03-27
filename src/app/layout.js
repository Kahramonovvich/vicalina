import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

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
  metadataBase: new URL("https://vicalina.uz"),
  openGraph: {
    title: "Vicalina – siz va oilangiz uchun!",
    description: "Qozonlar, skavotkalar, pichoqlar va boshqa oshxona buyumlari – Vicalina onlayn do‘konida",
    url: "https://vicalina.uz",
    siteName: "Vicalina",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "https://vicalina.uz/favicon.jpg",
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
    images: ["https://vicalina.uz/favicon.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className={dmSans.className}>
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
};