"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Гигантский вордмарк в две строки: DURYS / KURYLYS. В каждой строке буквы
 * разогнаны от левого до правого края (flex justify-between), при нехватке ширины
 * кегль ужимается — обе строки получают один общий кегль, иначе блок «разъезжается».
 * Появление — по буквам, clip-path снизу вверх, stagger .05 (CSS-анимация:
 * вордмарк на первом экране, ждать JS нельзя).
 */
export function Wordmark({ lines, className, delay = 0 }: { lines: readonly string[]; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const rows = Array.from(root.children) as HTMLElement[];

    const fit = () => {
      rows.forEach((r) => (r.style.fontSize = ""));
      // Минимальный воздух между буквами — 6% ширины строки, иначе ужимаем кегль.
      // Берём самый жёсткий коэффициент из всех строк: кегль у них общий.
      let ratio = 1;
      for (const row of rows) {
        const natural = (Array.from(row.children) as HTMLElement[]).reduce(
          (sum, l) => sum + l.getBoundingClientRect().width,
          0,
        );
        const max = row.clientWidth * 0.94;
        if (natural > max) ratio = Math.min(ratio, max / natural);
      }
      if (ratio < 1) {
        const size = parseFloat(getComputedStyle(rows[0]!).fontSize);
        rows.forEach((r) => (r.style.fontSize = `${Math.max(28, size * ratio)}px`));
      }
    };

    // Пересчитываем только при смене ширины: смена кегля меняет высоту блока, и без этой
    // проверки ResizeObserver срабатывал на собственную правку — бесконечный цикл layout.
    let lastWidth = -1;
    const onResize = () => {
      const w = root.clientWidth;
      if (w === lastWidth) return;
      lastWidth = w;
      fit();
    };

    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(root);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [lines]);

  let n = 0;

  return (
    <div ref={ref} aria-hidden className={cn("t-hero", className)}>
      {lines.map((line, row) => (
        <p key={row} className="flex w-full justify-between">
          {Array.from(line).map((ch, i) => (
            <span key={i} className="anim-letter inline-block" style={{ "--d": `${delay + n++ * 0.05}s` } as CSSProperties}>
              {ch}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
