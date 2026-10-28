import Image from "next/image";
import Link from "next/link";
import { serviceAlt, serviceTypes, type Service } from "@/content/services";
import { cn } from "@/lib/utils";
import { ArrowButton } from "./ArrowButton";
import { Mono } from "./Mono";

type Props = { service: Service; dark?: boolean; className?: string; sizes?: string };

export function ServiceCard({ service: s, dark, className, sizes = "(min-width: 1024px) 31vw, 85vw" }: Props) {
  return (
    <Link href={`/services/${s.slug}`} className={cn("group flex flex-col gap-5", className)}>
      <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink/10">
        <Image
          src={s.image}
          alt={serviceAlt(s)}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 inline-flex h-8 items-center gap-2 rounded-full bg-surface/95 px-3 text-[13px] font-medium text-ink">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {serviceTypes[s.type].label}
        </span>
        <ArrowButton tone="glass" className="absolute bottom-4 right-4" />
      </span>
      <span className="flex flex-col gap-2 px-1">
        <span className={cn("t-caption", dark ? "text-on-dark-muted" : "text-ink-muted")}>{s.term}</span>
        <span className="text-[19px] font-semibold leading-snug transition-transform duration-500 group-hover:-translate-y-0.5 lg:text-[21px]">
          {s.title}
        </span>
        <span className={cn("text-[15px] leading-snug", dark ? "text-on-dark/75" : "text-ink-muted")}>{s.summary}</span>
        <Mono className={cn("mt-1 !text-[12px]", dark ? "text-on-dark/60" : "text-ink-muted")}>{s.unit}</Mono>
      </span>
    </Link>
  );
}
