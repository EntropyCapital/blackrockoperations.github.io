import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://blackrockoperations.com"), // <-- change to your real domain
  title: "Blackrock Operations - Vision to Video",
  description: "Strategic video production for brands that demand impact.",

  openGraph: {
    title: "Blackrock Operations - Vision to Video",
    description: "Strategic video production for brands that demand impact.",
    url: "/",
    siteName: "Blackrock Operations",
    images: [
      {
        url: "/og.jpg", // file in /public
        width: 1200,
        height: 630,
        alt: "Blackrock Operations",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blackrock Operations - Vision to Video",
    description: "Strategic video production for brands that demand impact.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#101010]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
