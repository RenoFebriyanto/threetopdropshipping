import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Common animation presets
export const animationDefaults = {
  duration: 0.6,
  ease: 'power3.out',
};

export const staggerDefaults = {
  amount: 0.4,
  from: 'start',
};
