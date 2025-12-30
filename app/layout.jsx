import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import a Google Font like Inter for a clean, modern look
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blackrock Operations - Vision to Video',
  description: 'Strategic video production for brands that demand impact.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#101010]`}>
        {/* Navbar is placed here, outside the 'children', so it persists on all pages */}
        <Navbar />
        
        {/* 'children' will be replaced by your page.jsx (or other pages) */}
        {children}
        
        {/* Footer is also placed here to persist */}
        <Footer />
      </body>
    </html>
  );
}