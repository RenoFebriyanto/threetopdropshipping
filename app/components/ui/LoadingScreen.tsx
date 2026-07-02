'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '~/lib/gsap.config';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const loadingRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        onComplete?.();
      },
    });

    // 1. Counter count from 0 to 100
    timeline.to(
      counterRef.current,
      {
        textContent: 100,
        duration: 1.8,
        ease: 'power2.out',
        snap: { textContent: 1 },
      }
    );

    // 2. Logo slide in from bottom
    timeline.from(
      logoRef.current,
      {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // 3. Curtain slide UP (black curtain moves up)
    timeline.to(
      curtainRef.current,
      {
        yPercent: -100,
        duration: 0.9,
        ease: 'expo.inOut',
      },
      '+=0.2'
    );

    // 4. Loading screen fade out
    timeline.to(
      loadingRef.current,
      {
        opacity: 0,
        duration: 0.1,
        pointerEvents: 'none',
      }
    );
  }, [onComplete]);

  if (isComplete) {
    return null;
  }

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-50 bg-void flex items-center justify-center overflow-hidden"
    >
      {/* Counter */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        <div
          ref={counterRef}
          className="text-4xl font-mono text-signal tabular-nums font-bold tracking-widest"
        >
          000
        </div>

        {/* Logo */}
        <div ref={logoRef} className="flex flex-col items-center gap-2 opacity-0">
          <div className="text-3xl font-bold font-grotesk uppercase tracking-widest text-ivory">
            THREETOP
          </div>
          <p className="text-xs text-silver font-mono uppercase tracking-wider">
            Wear the Algorithm
          </p>
        </div>
      </div>

      {/* Curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-void z-20"
        style={{ top: 0 }}
      />
    </div>
  );
}
