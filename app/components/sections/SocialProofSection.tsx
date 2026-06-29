'use client';

import { useRef } from 'react';
import { useGSAP } from '~/hooks/useGSAP';
import { gsap } from '~/lib/gsap.config';
import { Star } from 'lucide-react';

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelectorAll('.proof-element'), {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-carbon py-24 sm:py-32 lg:py-40 border-b border-smoke"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-widest font-mono text-signal mb-4 opacity-70">Loved by thousands</p>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-ivory">
            What Our Community Says
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Main Review */}
          <div className="proof-element bg-ash rounded-lg p-8 border-2 border-smoke hover:border-signal transition-colors duration-300">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="fill-signal text-signal"
                />
              ))}
            </div>
            <p className="text-lg sm:text-xl text-ivory mb-6 leading-relaxed font-serif-display italic">
              "Finally a store that knows my style better than I do. The AI recommendations are eerily accurate."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-signal/20 border border-signal flex items-center justify-center text-signal font-bold">
                SK
              </div>
              <div>
                <p className="font-grotesk font-bold text-ivory text-sm uppercase tracking-wider">
                  Sarah K.
                </p>
                <p className="text-xs text-silver">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          {/* UGC Grid */}
          <div className="proof-element grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-graphite rounded-lg overflow-hidden group cursor-pointer border border-smoke hover:border-signal transition-all duration-300"
              >
                <div className="w-full h-full flex flex-col items-start justify-between bg-gradient-to-br from-graphite via-ash to-graphite relative overflow-hidden p-4">
                  <div className="w-10 h-10 rounded-full border border-signal/40 flex items-center justify-center text-signal text-xs font-bold">
                    0{i + 1}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-signal mb-2">UGC</p>
                    <p className="text-sm text-ivory font-grotesk font-semibold">Styled in 12 min</p>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-signal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-signal text-sm font-bold">View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Ticker */}
        <div className="proof-element bg-gradient-to-r from-ash via-graphite to-ash rounded-lg p-8 border-2 border-smoke/50 hover:border-signal/30 transition-colors duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-serif-display font-bold text-signal mb-2">4.9</p>
              <p className="text-xs text-pearl font-grotesk uppercase tracking-wider flex items-center justify-center gap-2">
                <span className="text-signal">★</span> Rating
              </p>
            </div>
            <div className="hidden sm:block border-l border-smoke" />
            <div>
              <p className="text-3xl sm:text-4xl font-serif-display font-bold text-signal mb-2">12,400+</p>
              <p className="text-xs text-pearl font-grotesk uppercase tracking-wider">Orders</p>
            </div>
            <div className="hidden sm:block border-l border-smoke" />
            <div>
              <p className="text-3xl sm:text-4xl font-serif-display font-bold text-signal mb-2">40+</p>
              <p className="text-xs text-pearl font-grotesk uppercase tracking-wider">Cities Worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
