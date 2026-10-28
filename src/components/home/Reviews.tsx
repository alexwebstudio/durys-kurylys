import { reviews, reviewsSection } from "@/content/reviews";
import { site } from "@/content/site";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" aria-hidden className={i < value ? "text-accent" : "text-line"}>
          <path
            fill="currentColor"
            d="M7 .9l1.76 3.9 4.24.46-3.17 2.86.88 4.18L7 10.2l-3.71 2.1.88-4.18L1 5.26l4.24-.46z"
          />
        </svg>
      ))}
    </span>
  );
}

/** Отзывы как есть из 2ГИС: имя, дата, текст, ссылка на источник. Ничего не переписано. */
export function Reviews({ id }: { id?: string }) {
  return (
    <SectionCard tone="surface-2" id={id} aria-labelledby="reviews-title" className="scroll-mt-24">
      <SectionHeader
        id="reviews-title"
        eyebrow={reviewsSection.eyebrow}
        lines={reviewsSection.lines}
        lead={reviewsSection.lead}
        aside={
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p className="flex items-baseline gap-3">
              <span className="t-stat">{site.gis.rating}</span>
              <span className="t-caption text-ink-muted">из 5</span>
            </p>
            <TextLink href={site.gis.reviewsUrl}>{reviewsSection.link}</TextLink>
          </div>
        }
      />

      <Reveal as="ul" aria-label="Отзывы из 2ГИС" className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
        {reviews.map((r) => (
          <li key={r.author} data-reveal="tilt" className="card flex flex-col gap-5 border border-line bg-surface p-6 lg:p-7">
            <Stars value={r.rating} />
            <blockquote className="flex-1 text-[17px] leading-relaxed lg:text-[18px]">«{r.text}»</blockquote>
            <footer className="flex flex-col gap-1 border-t border-line pt-4">
              <cite className="text-[15px] font-medium not-italic">{r.author}</cite>
              <Mono className="!text-[12px] text-ink-muted">{r.date} · 2ГИС</Mono>
            </footer>
          </li>
        ))}
      </Reveal>

      <Reveal self className="mt-10 lg:mt-12">
        <p className="max-w-xl text-[15px] leading-relaxed text-ink-muted">{reviewsSection.note}</p>
      </Reveal>
    </SectionCard>
  );
}
