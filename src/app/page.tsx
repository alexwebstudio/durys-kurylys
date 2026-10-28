import type { Metadata } from "next";
import { Brands } from "@/components/home/Brands";
import { CtaForm } from "@/components/home/CtaForm";
import { Documents } from "@/components/home/Documents";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Materials } from "@/components/home/Materials";
import { Process } from "@/components/home/Process";
import { Regulations } from "@/components/home/Regulations";
import { Reviews } from "@/components/home/Reviews";
import { RoofSection } from "@/components/home/RoofSection";
import { Services } from "@/components/home/Services";
import { TrustBento } from "@/components/home/TrustBento";
import { WhatWeCalculate } from "@/components/home/WhatWeCalculate";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({ title: pages.home.title, description: pages.home.description, path: "/" }),
  title: { absolute: pages.home.title },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Brands />
      <WhatWeCalculate />
      <RoofSection />
      <TrustBento />
      <Process />
      <Materials />
      <Services />
      <Reviews />
      <Regulations />
      <Documents />
      <Faq />
      <CtaForm />
    </>
  );
}
