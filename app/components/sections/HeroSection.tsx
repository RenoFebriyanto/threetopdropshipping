'use client';

import { useEffect, useRef, Suspense } from 'react';
import { gsap } from '~/lib/gsap.config';
import { useGSAP } from '~/hooks/useGSAP';
import FabricScene from '~/components/three/FabricScene';
import { HeroGraphic } from '~/lib/svgGraphics';
import { ChevronDown } from 'lucide-react';

// Split text into words for staggered animation
function splitTextToWords(text: string) {
  return text.split(' ').map((word, index) => (
    <span key={index} className="inline-block mr-4">
      {word}
    </span>
  ));
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const threeCanvasRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation
  useGSAP(() => {
    const timeline = gsap.timeline({ delay: 2.6 });

    // Background Three.js scene fade in
    timeline.from(threeCanvasRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    });

    // Headline words - split and animate
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('span');
      timeline.from(
        words,
        {
          y: 100,
          opacity: 0,
          rotateX: -15,
          stagger: 0.06,
          duration: 0.8,
          ease: 'expo.out',
        },
        '-=0.8'
      );
    }

    // Subtext fade in
    timeline.from(
      subtextRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      },
      '-=0.3'
    );

    // CTA buttons stagger from bottom
    if (ctaGroupRef.current) {
      const buttons = ctaGroupRef.current.querySelectorAll('button');
      timeline.from(
        buttons,
        {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }

    // Scroll indicator fade in
    timeline.from(
      scrollIndicatorRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.2'
    );
  });

  // Scroll indicator animation
  useEffect(() => {
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen bg-void flex items-center justify-center overflow-hidden"
    >
      {/* SVG Graphic Background */}
      <div className="absolute inset-0 opacity-60">
        <HeroGraphic />
      </div>

      {/* Three.js Background - removed in favor of SVG for consistency */}
      <div ref={threeCanvasRef} className="absolute inset-0 opacity-0" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col items-center text-center">
        {/* Decorative top accent */}
        <div className="mb-8 flex items-center gap-4 opacity-60">
          <div className="h-px w-12 bg-signal" />
          <span className="text-xs uppercase tracking-widest font-mono text-signal">Premium Fashion</span>
          <div className="h-px w-12 bg-signal" />
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold leading-tight mb-6 tracking-tighter"
        >
          {splitTextToWords('STYLE. CURATED BY AI.')}
        </h1>

        {/* Decorative divider */}
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-signal to-transparent mb-8" />

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-sm sm:text-lg text-pearl font-grotesk mb-12 max-w-2xl leading-relaxed"
        >
          Algorithm-powered fashion drops.
          <br />
          Yours before the trend hits.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaGroupRef} className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="px-8 py-4 bg-signal text-void font-grotesk font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-signal-dim hover:scale-105 relative group overflow-hidden">
            <span className="relative z-10">SHOP THE DROP →</span>
            <div className="absolute inset-0 bg-signal-dim transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>
          <button className="px-8 py-4 border-2 border-signal text-signal font-grotesk uppercase tracking-wider text-sm transition-all duration-300 hover:bg-signal hover:text-void hover:scale-105">
            MEET YOUR AI STYLIST
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <p className="text-xs uppercase tracking-widest font-mono text-signal">SCROLL</p>
        <div className="w-0.5 h-8 bg-gradient-to-b from-signal to-transparent" />
        <ChevronDown size={16} className="text-signal animate-bounce" />
      </div>

      {/* Corner Decorators */}
      <div className="absolute top-8 right-8 text-xs font-mono text-signal opacity-70 text-right">
        <p className="font-bold">2,400+</p>
        <p className="text-silver">pieces curated</p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent" />
    </section>
  );
}
