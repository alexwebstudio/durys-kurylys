import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaterial } from "@/content/materials";
import { getService, getServiceNeighbours, serviceAlt, services, serviceTypes } from "@/content/services";
import { LeadButton } from "@/components/forms/LeadButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Heading } from "@/components/ui/Heading";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { KeyValueTable } from "@/components/ui/SpecTable";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({
    title: s.title,
    description: `${s.summary} ${serviceTypes[s.type].label}, ${site.city}. Срок: ${s.term}, расчёт ${s.unit}.`.slice(0, 155),
    path: `/services/${s.slug}`,
    type: "article",
    image: { url: s.image, width: 1440, height: 1080, alt: serviceAlt(s) },
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const material = s.materialSlug ? getMaterial(s.materialSlug) : undefined;
  const { prev, next } = getServiceNeighbours(s.slug);
  const passport = [
    { label: "Направление", value: serviceTypes[s.type].label },
    { label: "Срок на объект", value: s.term, mono: true },
    { label: "Как считаем", value: s.unit },
    {
      label: "Материал",
      value: material ? (
        <Link href={`/materials/${material.slug}`} className="link-underline pb-0.5">
          {material.title}
        </Link>
      ) : (
        s.materialLabel
      ),
    },
    { label: "Город", value: `${site.city}, ${site.regions.split(",")[1]?.trim() ?? ""}`.replace(/,\s*$/, "") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: serviceTypes[s.type].label,
    description: s.summary,
    image: absoluteUrl(s.image),
    url: absoluteUrl(`/services/${s.slug}`),
    areaServed: site.regions,
    provider: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      {/* 1–4: крошки, eyebrow, h1, кнопки */}
      <SectionCard tone="surface" aria-labelledby="service-title" className="!pt-[calc(var(--header-h)+40px)]">
        <Breadcrumbs
          items={[
            { name: "Услуги", path: "/services" },
            { name: s.title, path: `/services/${s.slug}` },
          ]}
        />
        <Reveal self instant delay={0.1} className="t-eyebrow mb-5 mt-12 lg:mt-16">
          {serviceTypes[s.type].label} · {s.term}
        </Reveal>
        <Heading id="service-title" level="h1" lines={splitTitle(s.title)} cascade instant delay={0.15} />
        <Reveal self instant delay={0.35} className="mt-8 flex flex-wrap gap-3 lg:mt-10">
          <LeadButton source={`Услуга: ${s.title}`}>Вызвать замерщика →</LeadButton>
          <ButtonLink href="/services" variant="ghost">
            Все услуги
          </ButtonLink>
        </Reveal>
      </SectionCard>

      {/* 5: крупное фото. Без reveal: это LCP-элемент. */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-section)] bg-surface-2 lg:aspect-[16/9]">
        <Image src={s.image} alt={serviceAlt(s)} fill priority quality={85} sizes="100vw" className="object-cover" />
      </div>

      {/* 6–8: паспорт, о работе, что входит */}
      <SectionCard tone="surface" aria-label="Состав работ">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p data-reveal className="t-eyebrow mb-5">
              Коротко
            </p>
            <KeyValueTable rows={passport} caption={`Параметры: ${s.title}`} />
          </Reveal>

          <div className="flex flex-col gap-14 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 data-reveal className="t-eyebrow mb-5">
                Как мы это делаем
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed">
                {s.about.map((t) => (
                  <p key={t.slice(0, 24)} data-reveal>
                    {t}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <h2 data-reveal className="t-eyebrow mb-5">
                Что входит в работу
              </h2>
              <ul className="border-t border-line">
                {s.done.map((d, i) => (
                  <li key={d} data-reveal className="flex gap-5 border-b border-line py-4">
                    <Mono className="pt-0.5 !text-[13px] text-ink-muted">{String(i + 1).padStart(2, "0")}</Mono>
                    <span className="text-[16px]">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </SectionCard>

      {/* 9: что проверять при приёмке — то же самое, но с нашей стороны стола */}
      <SectionCard tone="graphite" aria-labelledby="check-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="t-eyebrow !text-on-dark-muted mb-5">Приёмка</p>
            <h2 id="check-title" className="t-h2">
              Что проверить самому
            </h2>
          </div>
          <Reveal as="ul" className="flex flex-col gap-px bg-on-dark/15 lg:col-span-7 lg:col-start-6">
            {s.check.map((c, i) => (
              <li key={c} data-reveal className="flex gap-5 bg-graphite py-6">
                <Mono className="pt-1 !text-[13px] text-on-dark/55">{String(i + 1).padStart(2, "0")}</Mono>
                <span className="text-[17px] leading-relaxed lg:text-[18px]">{c}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </SectionCard>

      {/* 10: соседние услуги */}
      <nav aria-label="Другие услуги" className="grid gap-[var(--stack-gap)] sm:grid-cols-2">
        <Link
          href={`/services/${prev.slug}`}
          className="group section-card flex flex-col gap-3 bg-surface !py-8 transition-colors hover:bg-surface-2 lg:!py-10"
        >
          <span className="t-caption flex items-center gap-2 text-ink-muted">
            <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1" /> Предыдущая
          </span>
          <span className="text-[19px] font-semibold lg:text-[22px]">{prev.title}</span>
        </Link>
        <Link
          href={`/services/${next.slug}`}
          className="group section-card flex flex-col items-end gap-3 bg-surface !py-8 text-right transition-colors hover:bg-surface-2 lg:!py-10"
        >
          <span className="t-caption flex items-center gap-2 text-ink-muted">
            Следующая <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </span>
          <span className="text-[19px] font-semibold lg:text-[22px]">{next.title}</span>
        </Link>
      </nav>

      {/* 11: сквозной CTA */}
      <CtaBand source={`Услуга: ${s.title}`} />
      <JsonLd data={jsonLd} />
    </>
  );
}

/** «Монтаж скатной кровли» → ["Монтаж", "*скатной кровли*"] — акцент на предмете работы. */
function splitTitle(title: string): string[] {
  const words = title.split(" ");
  if (words.length < 2) return [title];
  const head = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const tail = words.slice(Math.ceil(words.length / 2)).join(" ");
  return [head, `*${tail}*`];
}
