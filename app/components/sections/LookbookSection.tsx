'use client';

import { useRef } from 'react';
import { useGSAP } from '~/hooks/useGSAP';
import { gsap } from '~/lib/gsap.config';

const createLookbookPlaceholder = (title: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="#080808" />
      <rect x="80" y="80" width="1040" height="640" rx="36" fill="none" stroke="#E8FF00" stroke-opacity="0.3" stroke-width="3" />
      <circle cx="920" cy="240" r="140" fill="#E8FF00" fill-opacity="0.12" />
      <rect x="180" y="220" width="320" height="260" rx="28" fill="#161616" stroke="#E8FF00" stroke-opacity="0.35" />
      <path d="M240 420L300 340L352 392L418 300" stroke="#E8FF00" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
      <text x="600" y="360" fill="#E8FF00" font-size="56" font-weight="700" font-family="Arial, sans-serif" text-anchor="middle">${title}</text>
      <text x="600" y="430" fill="#F5F5F0" font-size="28" font-family="Arial, sans-serif" text-anchor="middle">AI CURATED DROP</text>
      <text x="600" y="610" fill="#8A8A8A" font-size="22" font-family="Arial, sans-serif" text-anchor="middle">THREETOP · FASHION REIMAGINED</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const lookbookImages = [
  {
    id: 1,
    title: 'SUMMER DROP',
    pieces: '12 pieces',
    image: createLookbookPlaceholder('SUMMER DROP'),
  },
  {
    id: 2,
    title: 'URBAN ESSENTIALS',
    pieces: '8 pieces',
    image: createLookbookPlaceholder('URBAN ESSENTIALS'),
  },
  {
    id: 3,
    title: 'EDITORIAL SERIES',
    pieces: '15 pieces',
    image: createLookbookPlaceholder('EDITORIAL SERIES'),
  },
  {
    id: 4,
    title: 'MINIMALIST CORE',
    pieces: '6 pieces',
    image: createLookbookPlaceholder('MINIMALIST CORE'),
  },
  {
    id: 5,
    title: 'STATEMENT PIECES',
    pieces: '10 pieces',
    image: createLookbookPlaceholder('STATEMENT PIECES'),
  },
];

export default function LookbookSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!track || !section) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${section.offsetHeight * 2.2}`,
        scrub: 1,
        pin: true,
      },
    });

    timeline.to(trackRef.current, {
      xPercent: -75,
      ease: 'none',
    });
  });

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="w-full section-shell py-24 sm:py-32 border-b border-smoke relative"
    >
      <div className="absolute top-8 left-8 z-10 rounded-2xl border border-signal/20 bg-black/40 px-4 py-3 backdrop-blur-md">
        <p className="text-[10px] uppercase tracking-[0.35em] font-mono text-signal mb-2">
          Lookbook
        </p>
        <h2 className="section-heading text-2xl sm:text-3xl font-bold text-ivory">
          Our Editorial Curation
        </h2>
      </div>

      {/* Horizontal Scrollable Track */}
      <div className="w-full h-[420px] sm:h-[520px] lg:h-[620px] overflow-x-auto md:overflow-hidden snap-x snap-mandatory md:snap-none">
        <div
          ref={trackRef}
          className="lookbook-track flex gap-6 h-full min-w-full md:min-w-max md:mx-0"
          style={{ width: 'max-content' }}
        >
          {lookbookImages.map((item) => (
            <div
              key={item.id}
              className="section-card flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[60vw] h-full relative group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 snap-start"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-pearl font-grotesk">
                  {item.pieces} curated for you
                </p>
              </div>

              {/* CTA */}
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-signal text-void px-6 py-3 font-bold uppercase text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                EXPLORE →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-xs font-mono text-silver uppercase tracking-wider">
        Scroll horizontally
      </div>
    </section>
  );
}
