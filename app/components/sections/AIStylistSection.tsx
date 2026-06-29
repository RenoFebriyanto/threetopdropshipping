'use client';

import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '~/hooks/useGSAP';
import { gsap } from '~/lib/gsap.config';

export default function AIStylistSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<
    { type: 'user' | 'ai'; content: string }[]
  >([]);

  // Simulate AI conversation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        { type: 'user', content: 'I need something for a rooftop dinner' },
        { type: 'ai', content: 'Perfect! I\'ve curated 3 pieces for you...' },
      ]);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelectorAll('.ai-element'), {
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
      className="w-full bg-carbon py-24 sm:py-32 lg:py-40 border-b border-smoke relative"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-signal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            <div className="ai-element inline-flex items-center gap-3 w-fit px-4 py-2 border border-signal rounded-full bg-void/50">
              <span className="w-2 h-2 bg-signal rounded-full animate-pulse" />
              <p className="text-xs uppercase tracking-widest font-mono text-signal">Powered by AI</p>
            </div>
            
            <h2 className="ai-element text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-ivory">
              Your Personal Style Algorithm
            </h2>
            
            <p className="ai-element text-base sm:text-lg text-pearl leading-relaxed">
              Tell us your vibe. Get a curated look. Our AI learns your preferences
              and surfaces pieces that match your unique style before they sell out.
            </p>
            
            <button className="ai-element self-start px-8 py-4 bg-signal text-void font-grotesk font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-signal-dim hover:scale-105 mt-4 rounded">
              TRY AI STYLIST →
            </button>
          </div>

          {/* Right: Chat Interface */}
          <div
            ref={chatBoxRef}
            className="ai-element bg-ash rounded-lg border-2 border-smoke hover:border-signal transition-all duration-300 p-6 flex flex-col shadow-lg hover:shadow-signal/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-smoke">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-signal rounded-full animate-pulse" />
                <p className="font-grotesk font-bold text-ivory text-sm uppercase tracking-wider">
                  THREETOP AI
                </p>
              </div>
              <p className="text-xs text-signal font-mono">Online</p>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 mb-6 max-h-40 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-silver italic">Waiting for your message...</p>
                  <div className="flex justify-center gap-1 mt-4">
                    <div className="w-2 h-2 bg-silver rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-silver rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-silver rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-lg text-sm ${
                        msg.type === 'user'
                          ? 'bg-signal text-void font-grotesk font-semibold'
                          : 'bg-graphite text-ivory border border-smoke'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="What's your style vibe?"
                className="flex-1 bg-graphite border-2 border-smoke px-4 py-3 text-ivory placeholder-silver outline-none focus:border-signal transition-all duration-300 text-sm rounded"
              />
              <button className="px-4 py-3 bg-signal text-void font-bold text-sm uppercase hover:bg-signal-dim transition-all duration-300 rounded">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
