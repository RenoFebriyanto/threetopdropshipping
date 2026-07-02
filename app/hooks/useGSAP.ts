import { useEffect, useRef } from 'react';
import { gsap } from '~/lib/gsap.config';

interface UseGSAPOptions {
  dependencies?: React.DependencyList;
  scope?: React.RefObject<HTMLElement>;
}

export function useGSAP(
  callback: () => void | gsap.core.Timeline,
  options?: UseGSAPOptions
) {
  const contextRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  useEffect(() => {
    // Create a GSAP context for proper cleanup
    const context = gsap.context(() => {
      callback();
    });

    contextRef.current = context;

    return () => {
      context.revert();
    };
  }, options?.dependencies || []);

  return contextRef;
}
