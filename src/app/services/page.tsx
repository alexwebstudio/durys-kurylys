import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionCard } from "@/components/ui/SectionCard";
import { buildMetadata } from "@/lib/seo";

const p = pages.services;

export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        lines={p.lines}
        lead={p.lead}
        image={p.image}
        alt={p.alt}
        crumbs={[{ name: "Услуги", path: "/services" }]}
      />
      <SectionCard tone="surface" aria-label="Каталог услуг">
        <ServicesExplorer />
      </SectionCard>
      <CtaBand source="Страница услуг" />
    </>
  );
}
