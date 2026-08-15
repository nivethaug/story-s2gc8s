import { useState, useEffect, useRef } from 'react';
import { Droplet, Heart, Sparkles, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WaterfallParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function Thesource() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const waterfallParticles: WaterfallParticle[] = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 1.5,
    size: Math.random() * 3 + 2
  }));

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));

      const newVisible = new Set<string>();
      if (sectionProgress > 0.15) newVisible.add('waterfall');
      if (sectionProgress > 0.3) newVisible.add('revelation');
      if (sectionProgress > 0.5) newVisible.add('final');

      setVisibleElements(newVisible);

      if (sectionProgress > 0.25 && !isRevealed) {
        setIsRevealed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isRevealed]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="source-section" ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/30 to-slate-950 overflow-hidden">
      {/* Ethereal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-cyan-900/20 to-emerald-950/40" />

      {/* Central light source - the waterfall */}
      <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
        <div
          className={`relative w-1/2 h-full transition-all duration-[3000ms] ${isRevealed ? 'opacity-100' : 'opacity-30'}`}
        >
          {/* Waterfall light beam */}
          <div className="absolute left-1/2 top-0 w-64 -translate-x-1/2 h-full bg-gradient-to-b from-cyan-200/40 via-cyan-400/20 to-transparent blur-2xl" />
          <div className="absolute left-1/2 top-0 w-48 -translate-x-1/2 h-full bg-gradient-to-b from-white/30 via-cyan-300/15 to-transparent blur-xl" />

          {/* Waterfall particles */}
          {waterfallParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute top-0 rounded-full bg-gradient-to-b from-cyan-200/80 to-transparent"
              style={{
                left: `${particle.x}%`,
                width: `${particle.size}px`,
                height: `${particle.size * 8}px`,
                animation: `waterfall ${particle.duration}s linear ${particle.delay}s infinite`,
                filter: 'blur(1px)',
                opacity: 0.6
              }}
            />
          ))}
        </div>
      </div>

      {/* Radiating circles from source */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`absolute w-96 h-96 rounded-full border border-cyan-400/10 transition-all duration-[4000ms] ${isRevealed ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
        <div className={`absolute w-80 h-80 rounded-full border border-emerald-400/10 transition-all duration-[3500ms] ${isRevealed ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`} />
        <div className={`absolute w-64 h-64 rounded-full border border-purple-400/10 transition-all duration-[3000ms] ${isRevealed ? 'scale-100 opacity-0' : 'scale-100 opacity-100'}`} />
      </div>

      {/* Rainbow spray effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/4 w-64 h-64 transition-all duration-[4000ms] ${isRevealed ? 'opacity-40' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(ellipse, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-48 h-48 transition-all duration-[3500ms] ${isRevealed ? 'opacity-40' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(ellipse, rgba(163, 230, 53, 0.2) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
        <div
          className={`absolute top-1/2 left-1/3 w-56 h-56 transition-all duration-[3000ms] ${isRevealed ? 'opacity-40' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        {/* Waterfall reveal */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has('waterfall') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Droplet className="w-16 h-16 mx-auto mb-8 text-cyan-300" style={{ filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.8))' }} />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-emerald-200 mb-4">
            The Source
          </h2>
          <p className="text-cyan-100/60 font-light tracking-wide max-w-2xl mx-auto">
            Where all journeys end and begin again
          </p>
        </div>

        {/* Revelation card */}
        <div className={`max-w-3xl mx-auto mb-16 transition-all duration-1500 ${visibleElements.has('revelation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 via-cyan-500/10 to-emerald-500/10 backdrop-blur-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/5 via-transparent to-purple-400/5 animate-pulse" style={{ animationDuration: '4s' }} />

            <div className="relative text-center space-y-6">
              <Sparkles className="w-12 h-12 mx-auto text-amber-300" style={{ filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))' }} />

              <h3 className="text-2xl md:text-3xl font-extralight text-white/90 tracking-wide">
                The Hidden Waterfall
              </h3>

              <p className="text-lg text-cyan-100/70 font-light leading-relaxed">
                Here, at the heart of the forest, a waterfall cascades from heights unseen,
                its waters glowing with every color of life. This is the source of all
                bioluminescence—the lifeblood of the forest that has flowed since before
                the first trees took root.
              </p>

              <p className="text-cyan-100/50 font-light italic">
                Stand in its spray. Feel the ancient power. You have arrived.
              </p>
            </div>
          </div>
        </div>

        {/* Final message */}
        <div className={`max-w-2xl mx-auto text-center transition-all duration-1500 ${visibleElements.has('final') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="inline-flex items-center gap-4 p-6 rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10">
            <Heart className="w-6 h-6 text-pink-400" style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))' }} />
            <span className="text-white/80 font-light tracking-wide">
              You have witnessed the full beauty of the bioluminescent world
            </span>
          </div>
        </div>

        {/* Return to top */}
        <div className="text-center mt-16">
          <Button
            onClick={scrollToTop}
            className="group bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 hover:border-cyan-300/50 text-cyan-100 px-6 py-4 rounded-full backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
            aria-label="Return to the beginning of the journey"
          >
            <span className="flex items-center gap-3 font-light tracking-widest text-sm">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
              Begin Again
            </span>
          </Button>
        </div>
      </div>

      {/* Spirit Guide final whisper */}
      <div className="absolute bottom-12 right-12 z-20 max-w-xs opacity-0 animate-[fadeIn_1s_ease_3s_forwards]">
        <div className="relative p-4 rounded-2xl bg-cyan-900/30 backdrop-blur-xl border border-cyan-500/10">
          <p className="text-sm text-cyan-100/50 italic font-light leading-relaxed">
            "The forest will remember you, traveler. Until we meet again..."
          </p>
          <p className="text-xs text-cyan-400/40 mt-2 font-light tracking-wider">— Spirit Guide</p>
        </div>
      </div>

      {/* Credits footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-20">
        <p className="text-xs text-white/20 font-light tracking-widest">
          A Journey Through the Bioluminescent Forest
        </p>
      </div>

      <style>{`
        @keyframes waterfall {
          0% { transform: translateY(-10vh); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
