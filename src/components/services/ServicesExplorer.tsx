"use client";

import { useMemo, useState } from "react";
import { services, serviceTypes, type ServiceType } from "@/content/services";
import { pages } from "@/content/pages";
import { Mono } from "@/components/ui/Mono";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Filter = "all" | ServiceType;

/** Фильтр-чипсы со счётчиками по направлениям работ. */
export function ServicesExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: services.length };
    for (const s of services) c[s.type] = (c[s.type] ?? 0) + 1;
    return c;
  }, []);
  const shown = filter === "all" ? services : services.filter((s) => s.type === filter);

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: "Все" },
    ...(Object.keys(serviceTypes) as ServiceType[]).map((t) => ({ id: t, label: serviceTypes[t].plural })),
  ];

  const change = (next: Filter) => {
    setFilter(next);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div>
      <div
        role="group"
        aria-label="Направление работ"
        className="flex flex-wrap gap-2 border-b border-line pb-8"
      >
        {chips.map((c) => {
          const n = counts[c.id] ?? 0;
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => change(c.id)}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-[15px] font-medium transition-colors duration-300",
                active ? "border-graphite bg-graphite text-on-dark" : "border-line hover:bg-surface-2",
              )}
            >
              {c.label}
              <Mono className={cn("!text-[12px]", active ? "text-on-dark/70" : "text-ink-muted")}>{n}</Mono>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="t-mono mt-6 !text-[13px] text-ink-muted">
        Показано услуг: {shown.length} из {services.length}
      </p>

      <ul className="mt-8 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={s.slug}>
            <ServiceCard service={s} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw" />
          </li>
        ))}
      </ul>

      <p className="mt-14 border-t border-line pt-6 text-[14px] leading-relaxed text-ink-muted">
        {pages.services.note}
      </p>
    </div>
  );
}
