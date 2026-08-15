import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, TreeDeciduous, CloudRain, Droplets, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/', label: 'Begin Journey', icon: TreeDeciduous },
  { to: '/the-canopy', label: 'The Canopy', icon: CloudRain },
  { to: '/the-depths', label: 'The Depths', icon: Droplets },
  { to: '/the-source', label: 'The Source', icon: Sparkles },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Return to home"
          >
            <div className="relative">
              <TreeDeciduous className="w-8 h-8 text-emerald-400/80 transition-transform duration-300 group-hover:scale-110" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' }} />
              <div className="absolute inset-0 w-8 h-8 rounded-full bg-emerald-400/20 blur-lg animate-pulse" />
            </div>
            <span className="text-lg font-extralight tracking-widest text-emerald-100/80 hidden sm:block">
              BIOLUMINESCENCE
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-200 bg-cyan-500/10 border border-cyan-400/20'
                      : 'text-cyan-100/60 hover:text-cyan-100 hover:bg-white/5'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-50 text-cyan-100/80 hover:text-cyan-100 hover:bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 overflow-hidden ${
            isOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2 p-4 bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-light tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-200 bg-cyan-500/10 border border-cyan-400/20'
                      : 'text-cyan-100/60 hover:text-cyan-100 hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Floating progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
    </nav>
  );
}
