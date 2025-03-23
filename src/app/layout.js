import Header from "@/components/Header";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", '600', "700", '800', '900'],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className={dmSans.className}>
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}