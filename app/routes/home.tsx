'use client';

import type { Route } from "./+types/home";
import { useState } from 'react';
import LoadingScreen from '~/components/ui/LoadingScreen';
import HeroSection from '~/components/sections/HeroSection';
import TickerBar from '~/components/sections/TickerBar';
import ManifestoSection from '~/components/sections/ManifestoSection';
import FeaturedProducts from '~/components/sections/FeaturedProducts';
import AIStylistSection from '~/components/sections/AIStylistSection';
import LookbookSection from '~/components/sections/LookbookSection';
import SocialProofSection from '~/components/sections/SocialProofSection';
import NewsletterSection from '~/components/sections/NewsletterSection';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "THREETOP - Wear the Algorithm" },
    {
      name: "description",
      content: "AI-powered fashion drops curated before the trend hits.",
    },
  ];
}

export default function Home() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />
      {isLoadingComplete && (
        <>
          <HeroSection />
          <TickerBar />
          <ManifestoSection />
          <FeaturedProducts />
          <AIStylistSection />
          <LookbookSection />
          <SocialProofSection />
          <NewsletterSection />
        </>
      )}
    </>
  );
}
