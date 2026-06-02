import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Youtube, Facebook, Linkedin } from 'lucide-react';
import { BackgroundGrid } from './BackgroundGrid';
import { FloatingShapes } from './FloatingShapes';

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] mix-blend-overlay">
    <svg width="100%" height="100%">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const GradientBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-emerald-950">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-teal-800/40 blur-[100px] rounded-full mix-blend-screen"
    />
    <motion.div
      animate={{
        scale: [1.2, 1, 1.2],
        x: [0, 100, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] bg-emerald-700/30 blur-[120px] rounded-full mix-blend-screen"
    />
    <motion.div
      animate={{
        y: [0, -100, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-lime-900/40 blur-[90px] rounded-full mix-blend-screen"
    />
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Oferty pracy' },
    { path: '/internship', label: 'Staże' },
    { path: '/practices', label: 'Praktyki' },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-emerald-950/80 backdrop-blur-md shadow-lg py-3 border-emerald-800/50'
        : 'p-4 md:p-6 pointer-events-none border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-shrink-0 pointer-events-auto"
        >
          <div className="flex items-center gap-2 cursor-pointer group">
            <img src="/si.png" alt="RekordIT Logo" className="h-6 w-auto object-contain brightness-0 invert" />
            <span className="font-sans font-bold text-xl tracking-tight text-white">
              Rekord<span className="text-lime-400">IT</span>
            </span>
          </div>
        </motion.div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center pointer-events-auto">
          <div className="flex items-center bg-black/20 backdrop-blur-md border border-white/10 rounded-full p-1.5 gap-1 overflow-hidden relative">
            {links.map((link) => (
              <NavLink key={link.path} to={link.path} className="relative px-6 py-2 rounded-full transition-colors">
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-lime-400 rounded-full shadow-[0_0_15px_rgba(132,204,22,0.4)]"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    )}
                    <span
                      className={`relative z-10 font-sans font-medium text-xs tracking-wider uppercase transition-colors duration-200 ${isActive
                        ? 'text-emerald-950 font-bold'
                        : 'text-emerald-100/70 hover:text-white'
                        }`}
                    >
                      {link.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right: Social Icons & Mobile Toggle */}
        <div className="flex items-center justify-end w-32 gap-3 pointer-events-auto">
          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-emerald-400/70 hover:text-white transition-colors p-1.5 hover:bg-emerald-800/20 rounded-lg">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-emerald-400/70 hover:text-white transition-colors p-1.5 hover:bg-emerald-800/20 rounded-lg">
              <Linkedin size={18} />
            </a>
            <a href="#" className="text-emerald-400/70 hover:text-white transition-colors p-1.5 hover:bg-emerald-800/20 rounded-lg">
              <Youtube size={18} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 bg-emerald-900/95 backdrop-blur-xl border-2 border-dashed border-lime-400 rounded-2xl p-6 pointer-events-auto flex flex-col gap-4 shadow-[8px_8px_0px_0px_#000]"
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-lg font-bold p-2 transition-colors ${isActive ? 'text-lime-400' : 'text-white hover:text-lime-400'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen text-white relative flex flex-col overflow-x-hidden">
      <NoiseOverlay />
      <GradientBackground />
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <BackgroundGrid />
        <FloatingShapes />
      </div>
      <Navbar />
      <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto relative z-10 w-full flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-emerald-950/40 backdrop-blur-lg border-t-2 border-dashed border-emerald-800/50 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 mb-16">

            {/* Brand Column */}
            <div className="md:col-span-5 lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <img src="/si.png" alt="RekordIT Logo" className="h-8 w-auto object-contain brightness-0 invert" />
                <span className="font-sans font-bold text-2xl tracking-tight text-white">
                  Rekord<span className="text-lime-400">IT</span>
                </span>
              </div>
              <p className="text-emerald-200/70 text-sm leading-relaxed font-light max-w-sm">
                Tworzymy innowacyjne oprogramowanie i budujemy zespoły ekspertów od ponad 35 lat. Dołącz do nas i zmieniaj świat IT.
              </p>
            </div>

            {/* Links Columns Wrapper */}
            <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-sans font-bold text-white uppercase text-sm tracking-wider mb-6">
                  Firma
                </h4>
                <ul className="space-y-3 text-emerald-100/80 text-sm">
                  <li><a href="#" className="hover:text-lime-400 transition-colors">O nas</a></li>
                  <li><a href="#" className="hover:text-lime-400 transition-colors">Historia</a></li>
                  <li><a href="#" className="hover:text-lime-400 transition-colors">Blog</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-sans font-bold text-white uppercase text-sm tracking-wider mb-6">
                  Wsparcie
                </h4>
                <ul className="space-y-3 text-emerald-100/80 text-sm">
                  <li><a href="#" className="hover:text-lime-400 transition-colors">Kontakt</a></li>
                  <li><a href="#" className="hover:text-lime-400 transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-lime-400 transition-colors">Prywatność</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-sans font-bold text-white uppercase text-sm tracking-wider mb-6">
                  Dla kandydatów
                </h4>
                <ul className="space-y-3 text-emerald-100/80 text-sm">
                  <li><a href="#/" className="hover:text-lime-400 transition-colors">Oferty pracy</a></li>
                  <li><a href="#/internship" className="hover:text-lime-400 transition-colors">Staże</a></li>
                  <li><a href="#/practices" className="hover:text-lime-400 transition-colors">Praktyki</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-emerald-800/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-emerald-500/60 text-sm font-mono text-center md:text-left">
              © 2025 RekordIT Systems. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-400 hover:bg-white hover:text-emerald-950 transition-all">
                <Youtube size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-400 hover:bg-white hover:text-emerald-950 transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-400 hover:bg-white hover:text-emerald-950 transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};