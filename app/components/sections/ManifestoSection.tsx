'use client';

import { useRef } from 'react';
import { useGSAP } from '~/hooks/useGSAP';
import { gsap } from '~/lib/gsap.config';
import { StatIcon } from '~/lib/svgGraphics';

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const lines = sectionRef.current.querySelectorAll('.manifesto-line');

    gsap.from(lines, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  return (
    <section ref={sectionRef} className="w-full section-shell py-24 sm:py-32 lg:py-40 border-b border-smoke">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <h2 className="manifesto-line section-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-ivory">
              WE DON'T FOLLOW TRENDS.
            </h2>
            <h3 className="manifesto-line section-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-signal">
              WE PREDICT THEM.
            </h3>

            <p className="manifesto-line text-base sm:text-lg text-pearl leading-relaxed mt-4">
              THREETOP uses machine learning to surface the pieces that matter
              before they sell out. No noise. Just the right thing, at the right time.
            </p>
          </div>

          {/* Stats */}
          <div className="section-card flex flex-col gap-8 rounded-[2rem] p-8 lg:border-l lg:border-smoke lg:pl-16">
            <div className="manifesto-line flex gap-4 items-start">
              <StatIcon type="pieces" />
              <div>
                <p className="text-4xl sm:text-5xl font-serif-display font-bold text-signal mb-2">
                  2,400+
                </p>
                <p className="text-sm text-silver uppercase tracking-wide font-grotesk">
                  Pieces Curated
                </p>
              </div>
            </div>
            <div className="manifesto-line flex gap-4 items-start">
              <StatIcon type="satisfaction" />
              <div>
                <p className="text-4xl sm:text-5xl font-serif-display font-bold text-signal mb-2">
                  98%
                </p>
                <p className="text-sm text-silver uppercase tracking-wide font-grotesk">
                  Customer Satisfaction
                </p>
              </div>
            </div>
            <div className="manifesto-line flex gap-4 items-start">
              <StatIcon type="delivery" />
              <div>
                <p className="text-4xl sm:text-5xl font-serif-display font-bold text-signal mb-2">
                  48h
                </p>
                <p className="text-sm text-silver uppercase tracking-wide font-grotesk">
                  Average Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
