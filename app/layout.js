import { GoogleTagManager } from "@next/third-parties/google";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Backdrop from "./components/helper/backdrop";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = "Tunde Olupitan, Full-Stack Engineer";
const description =
  "Full-Stack Engineer with 7+ years shipping DeFi protocols, marketplaces and mobile apps with React, Next.js, TypeScript, Node.js and Nest.js, and running them on AWS and Google Cloud. Based in Lagos, Nigeria, working remotely.";

export const metadata = {
  metadataBase: new URL("https://tundebrown.netlify.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Tunde Olupitan",
    images: [{ url: "/og-image.jpg", alt: title }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceef5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c16" },
  ],
};

// Runs before first paint so the saved (or system) theme is applied without a flash.
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] btn btn-primary"
        >
          Skip to content
        </a>
        <Backdrop />
        <ToastContainer />
        <Navbar />
        <main
          id="main"
          className="min-h-screen relative mx-auto px-4 sm:px-8 lg:px-12 lg:max-w-[72rem] xl:max-w-[78rem] 2xl:max-w-[88rem] text-fg"
        >
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
