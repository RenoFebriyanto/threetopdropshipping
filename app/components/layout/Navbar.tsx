'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from '~/lib/gsap.config';
import { useGSAP } from '~/hooks/useGSAP';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const navLogoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const navCtaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navbar entrance animation
  useGSAP(() => {
    const timeline = gsap.timeline({ delay: 2.2 });
    const navItems = navLinksRef.current?.children;

    timeline.from(navLogoRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
    });

    if (navItems) {
      timeline.from(navItems, {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.4');
    }

    if (navCtaRef.current) {
      timeline.from(navCtaRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: 'back.out(1.7)',
      }, '-=0.2');
    }
  });

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      if (navRef.current) {
        gsap.to(navRef.current, {
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.8)' : 'rgba(10, 10, 10, 0)',
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
          duration: 0.3,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 lg:px-16 py-4 transition-colors duration-300"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div ref={navLogoRef} className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 text-ivory hover:text-signal transition-colors" aria-label="THREETOP home">
              <img
                src="/icon-512.png"
                alt="THREETOP logo"
                className="h-10 w-10 rounded-full object-cover border border-signal/40 shadow-[0_0_24px_rgba(232,255,0,0.15)]"
              />
              <span className="text-lg font-bold font-grotesk uppercase tracking-[0.35em]">THREETOP</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div
            ref={navLinksRef}
            className="hidden md:flex items-center gap-8"
          >
            <Link
              to="#new-in"
              className="text-xs uppercase tracking-widest font-grotesk font-medium hover:text-signal transition-colors"
            >
              NEW IN
            </Link>
            <Link
              to="#collections"
              className="text-xs uppercase tracking-widest font-grotesk font-medium hover:text-signal transition-colors"
            >
              COLLECTIONS
            </Link>
            <Link
              to="#lookbook"
              className="text-xs uppercase tracking-widest font-grotesk font-medium hover:text-signal transition-colors"
            >
              LOOKBOOK
            </Link>
            <Link
              to="#ai-stylist"
              className="text-xs uppercase tracking-widest font-grotesk font-medium hover:text-signal transition-colors"
            >
              AI STYLIST
            </Link>
          </div>

          {/* Right actions */}
          <div ref={navCtaRef} className="flex items-center gap-4">
            <button className="p-2 hover:text-signal transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 hover:text-signal transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-signal text-void text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
            <button
              className="md:hidden p-2 hover:text-signal transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 top-16 z-30 bg-carbon md:hidden overflow-hidden"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="flex flex-col gap-6 p-8">
          <Link
            to="#new-in"
            className="text-sm uppercase tracking-widest font-grotesk font-medium hover:text-signal transition-colors"
            onClick={() => setIsOpen(false)}
          >
            NEW IN
          </Link>
          <Link
            to="#collections"
            className="text-sm uppercase tracking-widest font-grotesk font-medium hover:text-signal transition-colors"
            onClick={() => setIsOpen(false)}
          >
            COLLECTIONS
          </Link>
          <Link
            to="#lookbook"
            className="text-sm uppercase tracking-widest font-grotesk font-medium hover:text-signal transition-colors"
            onClick={() => setIsOpen(false)}
          >
            LOOKBOOK
          </Link>
          <Link
            to="#ai-stylist"
            className="text-sm uppercase tracking-widest font-grotesk font-medium hover:text-signal transition-colors"
            onClick={() => setIsOpen(false)}
          >
            AI STYLIST
          </Link>
        </div>
      </div>
    </>
  );
}
