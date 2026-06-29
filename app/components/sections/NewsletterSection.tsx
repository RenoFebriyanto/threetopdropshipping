'use client';

import { useRef } from 'react';
import { useGSAP } from '~/hooks/useGSAP';
import { gsap } from '~/lib/gsap.config';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelectorAll('.newsletter-element'), {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });
  });

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 sm:py-28 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-carbon via-void to-carbon" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent opacity-40" />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-signal opacity-30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-signal opacity-30" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-8 text-center z-10">
        {/* Icon */}
        <div className="newsletter-element flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-signal/10 border border-signal/30 flex items-center justify-center">
            <Mail size={32} className="text-signal" />
          </div>
        </div>

        <h2 className="newsletter-element text-3xl sm:text-4xl font-serif-display font-bold text-ivory mb-4">
          Get drops before everyone else.
        </h2>
        <p className="newsletter-element text-base sm:text-lg text-pearl mb-8 leading-relaxed">
          Join 12,000+ fashion-forward subscribers in our exclusive community.
        </p>

        {/* Email Input Form */}
        <div className="newsletter-element flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-ash border-2 border-smoke px-6 py-4 text-ivory placeholder-silver outline-none focus:border-signal transition-all duration-300 focus:shadow-lg focus:shadow-signal/20 text-sm rounded"
          />
          <button className="px-8 py-4 bg-signal text-void font-grotesk font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-signal-dim whitespace-nowrap rounded hover:scale-105 hover:shadow-lg hover:shadow-signal/30">
            JOIN NOW
          </button>
        </div>

        {/* Benefits */}
        <div className="newsletter-element flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-smoke">
          <div className="text-xs text-silver font-mono">
            <span className="text-signal font-bold">✓</span> No spam
          </div>
          <div className="text-xs text-silver font-mono">
            <span className="text-signal font-bold">✓</span> Exclusive drops
          </div>
          <div className="text-xs text-silver font-mono">
            <span className="text-signal font-bold">✓</span> Unsubscribe anytime
          </div>
        </div>
      </div>
    </section>
  );
}
