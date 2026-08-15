import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mistOpacity, setMistOpacity] = useState(0.7);
  const [creatureRevealed, setCreatureRevealed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const heroHeight = heroRef.current?.offsetHeight || 800;
      const scrollProgress = Math.min(window.scrollY / (heroHeight * 0.5), 1);
      setMistOpacity(0.7 - scrollProgress * 0.6);
      if (scrollProgress > 0.3) {
        setCreatureRevealed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => setCreatureRevealed(true), 2000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full pointer-events-none';
      const size = Math.random() * 4 + 2;
      const colors = ['bg-cyan-400', 'bg-emerald-400', 'bg-purple-400', 'bg-pink-400'];
      particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      particle.style.boxShadow = `0 0 ${size * 2}px currentColor`;
      particle.style.transition = 'transform 3s ease-out, opacity 3s ease-out';
      container.appendChild(particle);

      setTimeout(() => {
        particle.style.transform = `translateY(-${Math.random() * 100 + 50}px) translateX(${(Math.random() - 0.5) * 50}px)`;
        particle.style.opacity = '0';
      }, 50);

      setTimeout(() => particle.remove(), 3000);
    };

    const interval = setInterval(createParticle, 200);
    return () => clearInterval(interval);
  }, []);

  const scrollToCanopy = () => {
    const section = document.getElementById('canopy-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 min-h-screen">
      {/* Audio Toggle */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-slate-900/50 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group"
        aria-label={audioEnabled ? 'Disable ambient audio' : 'Enable ambient audio'}
      >
        {audioEnabled ? (
          <Volume2 className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
        ) : (
          <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-slate-300" />
        )}
      </button>

      {/* Floating particles container */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Deep forest gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-slate-950 to-emerald-950/60" />

        {/* Animated mist layers */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ opacity: mistOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-100/10 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-900/30 to-transparent" />
        </div>

        {/* Giant ferns silhouettes */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-96 h-96 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at bottom left, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
              transform: `translateY(${scrollY * 0.15}px)`
            }}
          />
        </div>

        {/* Magical creature - Phoenix-like spirit */}
        <div
          className={`absolute transition-all duration-[3000ms] ease-out ${creatureRevealed ? 'opacity-80 scale-100' : 'opacity-0 scale-95'}`}
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Creature glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 via-purple-500/20 to-pink-400/30 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />

            {/* Creature silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-32 h-32 md:w-40 md:h-40 text-cyan-300/80 animate-pulse" style={{ animationDuration: '2s', filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.6))' }} />
            </div>

            {/* Aura rings */}
            <div className="absolute inset-8 rounded-full border border-cyan-400/20 animate-ping" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-16 rounded-full border border-purple-400/15 animate-ping" style={{ animationDuration: '5s' }} />
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-wider mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-200 to-purple-200"
            style={{ transform: `translateY(${scrollY * -0.3}px)` }}
          >
            The Bioluminescent Forest
          </h1>
          <p
            className="text-lg md:text-xl text-emerald-100/70 font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ transform: `translateY(${scrollY * -0.25}px)` }}
          >
            A mystical journey awaits beneath the emerald canopy, where ancient secrets illuminate the darkness and spirits whisper through glowing leaves.
          </p>

          {/* Continue Journey button */}
          <Button
            onClick={scrollToCanopy}
            className="group relative bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 hover:border-cyan-300/50 text-cyan-100 px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
            aria-label="Continue your journey into the rainforest"
          >
            <span className="flex items-center gap-3 font-light tracking-widest">
              Begin Your Journey
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </span>
          </Button>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* Spirit Guide Quote Card */}
      <div className="fixed bottom-8 left-8 z-30 max-w-xs opacity-0 animate-[fadeIn_1s_ease_3s_forwards]">
        <div className="relative p-4 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-cyan-500/10 shadow-xl">
          <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-cyan-400/30 blur-sm" />
          <p className="text-sm text-emerald-100/60 italic font-light leading-relaxed">
            "The forest remembers those who walk with wonder..."
          </p>
          <p className="text-xs text-cyan-400/50 mt-2 font-light tracking-wider">— Spirit Guide</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
