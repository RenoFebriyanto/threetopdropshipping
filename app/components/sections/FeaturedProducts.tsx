'use client';

import { useRef } from 'react';
import { useGSAP } from '~/hooks/useGSAP';
import { gsap } from '~/lib/gsap.config';
import { ProductPlaceholder } from '~/lib/svgGraphics';

const products = [
  {
    id: 1,
    name: 'STRUCTURED OVERSHIRT',
    price: '489.000',
    badge: 'AI PICK',
  },
  {
    id: 2,
    name: 'WIDE LEG CARGO TROUSERS',
    price: '659.000',
    badge: 'TRENDING',
  },
  {
    id: 3,
    name: 'MINIMAL BOMBER JACKET',
    price: '1.249.000',
    badge: 'LIMITED',
  },
  {
    id: 4,
    name: 'RIBBED TURTLENECK SET',
    price: '379.000',
    badge: 'AI PICK',
  },
  {
    id: 5,
    name: 'ASYMMETRIC LAYER COAT',
    price: '1.899.000',
    badge: 'NEW',
  },
  {
    id: 6,
    name: 'TECH FABRIC JOGGER',
    price: '529.000',
    badge: 'TRENDING',
  },
];

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.product-card');

    gsap.from(cards, {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 80,
      opacity: 0,
      scale: 0.95,
      stagger: {
        amount: 0.4,
        from: 'start',
      },
      duration: 0.7,
      ease: 'power3.out',
    });
  });

  return (
    <section ref={sectionRef} className="w-full section-shell py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="section-pill mb-6">
            <span className="w-2 h-2 bg-signal rounded-full animate-pulse" />
            <p className="text-xs uppercase tracking-widest font-mono text-signal">New Drop Collection</p>
          </div>
          
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory mb-4">
            THIS WEEK
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-signal opacity-50" />
            <p className="text-xs uppercase tracking-widest font-mono text-silver">DROP 04</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-signal opacity-50" />
          </div>

          {/* Decorative elements */}
          <div className="mt-6 flex justify-center gap-8 opacity-40">
            <div className="w-1 h-8 bg-signal" />
            <div className="w-1 h-6 bg-signal" />
            <div className="w-1 h-8 bg-signal" />
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card section-card group cursor-pointer rounded-2xl p-4"
            >
              {/* Image Container */}
              <div className="relative mb-4 overflow-hidden bg-graphite/90 aspect-[4/5] rounded-xl border border-smoke/70">
                <ProductPlaceholder index={product.id - 1} />
                
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-signal text-void px-3 py-1 text-xs font-bold uppercase tracking-wider rounded z-10">
                  {product.badge}
                </div>
                {/* Quick Add Button */}
                <button className="absolute bottom-0 left-0 right-0 bg-signal text-void py-3 font-bold uppercase text-sm tracking-wider transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 rounded-t-xl">
                  QUICK ADD +
                </button>
              </div>

              {/* Info */}
              <div className="px-2">
                <p className="text-xs text-signal uppercase tracking-wider font-mono mb-2">
                  FASHION
                </p>
                <h3 className="text-sm font-grotesk font-bold text-ivory mb-3 group-hover:text-signal transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-mono text-pearl">
                    Rp {product.price}
                  </p>
                  <div className="w-6 h-6 border border-silver group-hover:border-signal rounded-full flex items-center justify-center transition-colors text-xs text-silver group-hover:text-signal">
                    ★
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button className="section-button-outline px-8 py-4 rounded-full border border-signal text-signal font-grotesk uppercase tracking-wider text-sm transition-all duration-300 hover:bg-signal hover:text-void">
            VIEW ALL DROPS →
          </button>
        </div>
      </div>
    </section>
  );
}
