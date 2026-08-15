import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Droplets, Skull, Fish, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Creature {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

export default function Thedepths() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialCreatures: Creature[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      speed: Math.random() * 0.5 + 0.2
    }));
    setCreatures(initialCreatures);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));

      const newVisible = new Set<string>();
      if (sectionProgress > 0.1) newVisible.add('title');
      if (sectionProgress > 0.25) newVisible.add('river');
      if (sectionProgress > 0.4) newVisible.add('roots');
      if (sectionProgress > 0.55) newVisible.add('creatures');

      setVisibleElements(newVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCreatures(prev => prev.map(creature => ({
        ...creature,
        x: creature.x + (Math.random() - 0.5) * creature.speed,
        y: creature.y + (Math.random() - 0.5) * creature.speed * 0.5,
      })).map(creature => ({
        ...creature,
        x: Math.max(5, Math.min(95, creature.x)),
        y: Math.max(10, Math.min(90, creature.y))
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollToSource = () => {
    const section = document.getElementById('source-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="depths-section" ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/60 to-slate-950 overflow-hidden">
      {/* Dark water gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-indigo-900/20 to-slate-950" />

      {/* Underwater caustics effect */}
      <div
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
          transform: `scale(${1 + scrollY * 0.0001})`
        }}
      />

      {/* Floating creatures */}
      {creatures.map(creature => (
        <div
          key={creature.id}
          className="absolute pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: `${creature.x}%`,
            top: `${creature.y}%`,
            transform: `translate(-50%, -50%) scale(${creature.size / 50})`
          }}
        >
          <div className="relative">
            <div className="w-3 h-1.5 rounded-full bg-cyan-400/40 blur-sm animate-pulse" style={{ animationDuration: `${2 + creature.id * 0.3}s` }} />
            <div className="absolute inset-0 w-3 h-1.5 rounded-full bg-indigo-400/30 blur-md" />
          </div>
        </div>
      ))}

      {/* Ancient roots silhouettes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -left-20 top-0 w-64 h-full opacity-30"
          style={{
            background: 'linear-gradient(to right, rgba(30, 58, 138, 0.4) 0%, transparent 100%)',
            transform: `translateY(${scrollY * 0.05}px)`
          }}
        />
        <div
          className="absolute -right-20 top-0 w-64 h-full opacity-30"
          style={{
            background: 'linear-gradient(to left, rgba(30, 58, 138, 0.4) 0%, transparent 100%)',
            transform: `translateY(${scrollY * 0.05}px)`
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        {/* Section title */}
        <div className={`text-center mb-20 transition-all duration-1000 ${visibleElements.has('title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Moon className="w-12 h-12 mx-auto mb-6 text-indigo-400/80" style={{ filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))' }} />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-200 mb-4">
            The Depths
          </h2>
          <p className="text-indigo-100/60 font-light tracking-wide max-w-2xl mx-auto">
            Where light fades and ancient mysteries awaken in the eternal twilight
          </p>
        </div>

        {/* River section */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 ${visibleElements.has('river') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-slate-900/40 backdrop-blur-xl border border-indigo-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <Droplets className="w-16 h-16 text-cyan-400/80" style={{ filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.6))' }} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-light text-cyan-100 mb-4 tracking-wide">The Glowing River</h3>
                <p className="text-cyan-100/60 font-light leading-relaxed">
                  Below the canopy, an underground river flows with waters so pure they emit a soft blue luminescence.
                  Bioluminescent algae drift like underwater stars, while phosphorescent fish trace ancient pathways
                  through submerged caves that no human has ever mapped.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Roots card */}
          <div className={`group transition-all duration-1000 ${visibleElements.has('roots') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="relative p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
              <Skull className="w-10 h-10 text-purple-400/80 mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))' }} />
              <h3 className="text-xl font-light text-purple-100 mb-3 tracking-wide">Ancient Roots</h3>
              <p className="text-sm text-purple-100/60 font-light leading-relaxed">
                Massive roots older than memory twist through the darkness, their surfaces covered in bioluminescent fungi
                that pulse with an eerie purple glow. Some say these roots connect all life in the forest.
              </p>
            </div>
          </div>

          {/* Creatures card */}
          <div className={`group transition-all duration-1000 delay-200 ${visibleElements.has('creatures') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="relative p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-pink-500/20 hover:border-pink-400/40 transition-all duration-500 h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none" />
              <Fish className="w-10 h-10 text-pink-400/80 mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))' }} />
              <h3 className="text-xl font-light text-pink-100 mb-3 tracking-wide">Hidden Beings</h3>
              <p className="text-sm text-pink-100/60 font-light leading-relaxed">
                In the deepest pools, creatures of legend are said to dwell. Pale and translucent, with eyes that glow
                like galaxies, they observe intruders with ancient curiosity before vanishing into the shadows.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Journey */}
        <div className="text-center">
          <Button
            onClick={scrollToSource}
            className="group bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 hover:border-indigo-300/50 text-indigo-100 px-6 py-4 rounded-full backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
            aria-label="Continue journey to the source"
          >
            <span className="flex items-center gap-3 font-light tracking-widest text-sm">
              Seek the Source
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>
      </div>

      {/* Spirit Guide whisper */}
      <div className="absolute bottom-20 left-12 z-20 max-w-xs opacity-0 animate-[fadeIn_1s_ease_2.5s_forwards]">
        <div className="relative p-4 rounded-2xl bg-indigo-900/30 backdrop-blur-xl border border-indigo-500/10">
          <p className="text-sm text-indigo-100/50 italic font-light leading-relaxed">
            "The deepest secrets reveal themselves only to those who dare to descend..."
          </p>
          <p className="text-xs text-indigo-400/40 mt-2 font-light tracking-wider">— Spirit Guide</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
