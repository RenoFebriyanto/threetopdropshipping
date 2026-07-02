'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '~/lib/gsap.config';
import { useMousePosition } from '~/hooks/useMousePosition';

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const position = useMousePosition();

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    // Animate dot (immediate follow)
    gsap.to(dotRef.current, {
      x: position.x - 4,
      y: position.y - 4,
      duration: 0,
    });

    // Animate ring (delayed follow)
    gsap.to(ringRef.current, {
      x: position.x - 16,
      y: position.y - 16,
      duration: 0.3,
      ease: 'power3.out',
    });
  }, [position]);

  // Hover effects
  useEffect(() => {
    const handleMouseEnter = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          width: 40,
          height: 40,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          width: 32,
          height: 32,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-signal rounded-full pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-signal rounded-full pointer-events-none z-50"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease-out, height 0.3s ease-out',
        }}
      />
    </>
  );
}
