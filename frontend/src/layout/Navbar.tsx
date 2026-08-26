import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change and restore focus to the toggle button
  useEffect(() => {
    if (isOpen) {
      closeMenu();
      menuButtonRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Keyboard support: Escape to close, Tab focus trap inside the panel
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeMenu();
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && menuPanelRef.current) {
        const focusables = menuPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  // Move focus into the menu when it opens
  useEffect(() => {
    if (isOpen) {
      const firstLink = menuPanelRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    }
  }, [isOpen]);

  return (
    <nav
      aria-label="Main navigation"
      data-testid="navbar"
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
            data-testid="navbar-link-home"
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
                data-testid={`navbar-link-${item.to === '/' ? 'begin-journey' : item.to.slice(1)}`}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-200 bg-cyan-500/10 border border-cyan-400/20'
                      : 'text-cyan-100/60 hover:text-cyan-100 hover:bg-white/5'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            data-testid="mobile-menu-toggle"
            className="md:hidden relative z-50 text-cyan-100/80 hover:text-cyan-100 hover:bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-menu"
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation-menu"
          ref={menuPanelRef}
          role="menu"
          aria-label="Site navigation"
          aria-hidden={!isOpen}
          data-testid="mobile-menu"
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 overflow-hidden ${
            isOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col gap-2 p-4 bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                role="menuitem"
                onClick={() => {
                  closeMenu();
                  menuButtonRef.current?.focus();
                }}
                tabIndex={isOpen ? 0 : -1}
                data-testid={`mobile-menu-link-${item.to === '/' ? 'begin-journey' : item.to.slice(1)}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-light tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-200 bg-cyan-500/10 border border-cyan-400/20'
                      : 'text-cyan-100/60 hover:text-cyan-100 hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
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
