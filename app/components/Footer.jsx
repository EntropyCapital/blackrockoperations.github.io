/**
 * The main site footer.
 * Stripped of navigation and refined for institutional anonymity.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/[0.03] bg-[#050505] text-white/30">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          
          {/* Logo and Copyright */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium tracking-tighter text-white uppercase">
              Blackrock Operations
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Blackrock Operations. All rights reserved.
            </p>
            <p className="font-mono text-[9px] text-white/10 uppercase tracking-[0.2em]">
              Operational Continuity // Asset Integrity
            </p>
          </div>

          {/* Social / External Only */}
          <div className="flex space-x-12">
            <div>
              <h4 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
                Network
              </h4>
              <ul className="space-y-2 font-mono text-[10px] uppercase tracking-widest">
                <li>
                  <a 
                    href="https://instagram.com/yourhandle" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-colors hover:text-white"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
