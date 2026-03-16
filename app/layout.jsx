import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// We'll use Inter for headers and a sharp Mono font for the technical data
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter' 
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: '--font-mono' 
});

export const metadata = {
  metadataBase: new URL("https://blackrockoperations.com"),
  title: "Blackrock Operations | Information Logistics & Strategic Assets",
  description: "Facilitating operational continuity and high-trust documentation for entities operating within discrete and contested environments.",

  openGraph: {
    title: "Blackrock Operations | Strategic Asset Archival",
    description: "Operational support for organizations in controlled, high-trust environments. Engaging in discrete information logistics.",
    url: "/",
    siteName: "Blackrock Operations",
    images: [
      {
        url: "/images/og.jpg", 
        width: 1200,
        height: 630,
        alt: "Blackrock Operations Terminal Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blackrock Operations",
    description: "Technical domains: Signal Acquisition, Narrative Engineering, and Asset Archival.",
    images: ["/images/og.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-[#050505] text-white antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
