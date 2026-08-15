import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Bug, Leaf, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export default function Thecanopy() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const firefliesRef = useRef<HTMLDivElement>(null);

  const fireflies: Firefly[] = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: ['bg-cyan-400', 'bg-emerald-400', 'bg-lime-400', 'bg-yellow-400'][Math.floor(Math.random() * 4)],
    delay: Math.random() * 5
  }));

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));

      const newVisible = new Set<string>();
      if (sectionProgress > 0.1) newVisible.add('title');
      if (sectionProgress > 0.2) newVisible.add('card1');
      if (sectionProgress > 0.35) newVisible.add('card2');
      if (sectionProgress > 0.5) newVisible.add('card3');

      setVisibleElements(newVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = firefliesRef.current;
    if (!container) return;

    fireflies.forEach(fly => {
      const el = document.createElement('div');
      el.className = `absolute rounded-full ${fly.color}`;
      el.style.cssText = `
        width: ${fly.size}px;
        height: ${fly.size}px;
        left: ${fly.x}%;
        top: ${fly.y}%;
        box-shadow: 0 0 ${fly.size * 3}px currentColor;
        animation: firefly ${3 + Math.random() * 2}s ease-in-out ${fly.delay}s infinite alternate;
        opacity: ${0.4 + Math.random() * 0.6};
      `;
      container.appendChild(el);
    });

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  const scrollToDepths = () => {
    const section = document.getElementById('depths-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="canopy-section" ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/80 to-slate-950 overflow-hidden">
      {/* Dense foliage gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-transparent to-emerald-900/30" />

      {/* Fireflies container */}
      <div ref={firefliesRef} className="absolute inset-0 overflow-hidden pointer-events-none" />

      {/* Canopy layers - parallax effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-800/50 to-transparent" />
      </div>

      <div
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-cyan-500/15 blur-2xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        {/* Section title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has('title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Leaf className="w-12 h-12 mx-auto mb-6 text-emerald-400/80" style={{ filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))' }} />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-lime-200 to-cyan-200 mb-4">
            The Canopy
          </h2>
          <p className="text-emerald-100/60 font-light tracking-wide max-w-2xl mx-auto">
            Where light first touches the ancient forest, a symphony of glowing life unfolds
          </p>
        </div>

        {/* Narrative cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className={`group transition-all duration-700 ${visibleElements.has('card1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="relative p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
              <Bug className="w-8 h-8 text-lime-400/80 mb-4 group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 8px rgba(163, 230, 53, 0.6))' }} />
              <h3 className="text-lg font-light text-emerald-100 mb-3 tracking-wide">Glowing Inhabitants</h3>
              <p className="text-sm text-emerald-100/60 font-light leading-relaxed">
                Millions of bioluminescent insects dance through the leaves, their bodies pulsing in synchronized rhythms that have existed for millennia. Each flash tells a story of territory, courtship, and ancient warnings.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`group transition-all duration-700 delay-200 ${visibleElements.has('card2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="relative p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
              <Wind className="w-8 h-8 text-cyan-400/80 mb-4 group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' }} />
              <h3 className="text-lg font-light text-cyan-100 mb-3 tracking-wide">Breathing Forest</h3>
              <p className="text-sm text-cyan-100/60 font-light leading-relaxed">
                The canopy breathes with the wind, each gust carrying spores and seeds that glow like falling stars. The air itself seems alive, thick with the scent of ancient earth and untamed magic.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`group transition-all duration-700 delay-400 ${visibleElements.has('card3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="relative p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
              <Leaf className="w-8 h-8 text-purple-400/80 mb-4 group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' }} />
              <h3 className="text-lg font-light text-purple-100 mb-3 tracking-wide">Living Architecture</h3>
              <p className="text-sm text-purple-100/60 font-light leading-relaxed">
                Giant ferns unfurl their fronds like neon cathedrals, while phosphorescent moss traces spiral patterns across ancient bark. Every surface glows with its own inner light.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Journey */}
        <div className="text-center mt-16">
          <Button
            onClick={scrollToDepths}
            className="group bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 hover:border-emerald-300/50 text-emerald-100 px-6 py-4 rounded-full backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]"
            aria-label="Continue journey to the depths"
          >
            <span className="flex items-center gap-3 font-light tracking-widest text-sm">
              Descend Deeper
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>
      </div>

      {/* Spirit Guide whisper */}
      <div className="absolute bottom-12 right-12 z-20 max-w-xs opacity-0 animate-[fadeIn_1s_ease_2s_forwards]">
        <div className="relative p-4 rounded-2xl bg-emerald-900/30 backdrop-blur-xl border border-emerald-500/10">
          <p className="text-sm text-emerald-100/50 italic font-light leading-relaxed">
            "Look closely... the smallest lights often hold the greatest wisdom..."
          </p>
          <p className="text-xs text-emerald-400/40 mt-2 font-light tracking-wider">— Spirit Guide</p>
        </div>
      </div>

      <style>{`
        @keyframes firefly {
          0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(10px, -20px) scale(1.2); opacity: 0.9; }
          50% { transform: translate(-15px, -40px) scale(0.9); opacity: 0.5; }
          75% { transform: translate(20px, -60px) scale(1.1); opacity: 0.8; }
          100% { transform: translate(-5px, -80px) scale(0.8); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
