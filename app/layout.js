import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta', // Optional: for CSS variables
});

export const metadata = {
  title: "Tunde Olupitan — Software Engineer",
  description:
    "Portfolio of Tunde Olupitan, a Full-Stack Engineer specialising in React, Next.js, TypeScript, Node.js, and Web3. Based in Lagos, Nigeria. Open to remote contracts and full-time roles.",
  openGraph: {
    title: "Tunde Olupitan — Software Engineer",
    description:
      "Full-Stack Engineer specialising in React, Next.js, TypeScript, and Cardano DeFi. Based in Lagos, Nigeria.",
    url: "https://tundebrown.netlify.app/",
    siteName: "Tunde Olupitan",
    images: [
      {
        url: "/og-image.png", // add a 1200x630 screenshot of your hero to /public
        width: 1200,
        height: 630,
        alt: "Tunde Olupitan — Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tunde Olupitan — Frontend Engineer",
    description:
      "Full-Stack Engineer specialising in React, Next.js, Node.js, Nest.js TypeScript, and Web3.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakarta.className}>
      <body>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
