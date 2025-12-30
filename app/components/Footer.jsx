import Link from 'next/link';

/**
 * The main site footer.
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#101010] text-gray-400">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between md:flex-row">
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0">
            <h3 className="mb-2 text-xl font-semibold text-white">Blackrock Operations</h3>
            <p className="text-sm">&copy; {new Date().getFullYear()} Blackrock Operations. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 flex space-x-8 md:mb-0">
            <div>
              <h4 className="mb-2 font-semibold text-white">Navigate</h4>
              <ul className="space-y-1">
                <li><Link href="/work" className="hover:text-white">Work</Link></li>
                <li><Link href="/Capabilities" className="hover:text-white">Capabilities</Link></li>
                <li><Link href="/Overview" className="hover:text-white">Overview</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-white">Social</h4>
              <ul className="space-y-1">
                {/* Add your real social links here */}
                <li><a href="#" className="hover:text-white">Vimeo</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}