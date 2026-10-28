"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { site } from "@/content/site";
import { PRELOADER_DONE_EVENT, PRELOADER_EXIT, PRELOADER_MIN_SHOW, PRELOADER_SAFETY } from "@/lib/preloader";

/**
 * Прелоадер с логотипом: буквы двух строк поднимаются из-под маски
 * с шагом 60мс, затем шторка уезжает вверх. Показывается на каждой полной загрузке. Пока он на экране,
 * у <html> стоит класс `is-loading` — CSS-интро первого экрана стоит на паузе и стартует вместе со шторкой.
 * Включает его инлайн-скрипт в layout (lib/preloader.ts); без JS прелоадера нет.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = ref.current;
    if (!el) return;
    if (!html.classList.contains("is-loading")) {
      el.style.display = "none";
      return;
    }

    const started = performance.now();
    let done = false;
    const timers: number[] = [];

    const hide = () => {
      if (done) return;
      done = true;
      el.classList.add("preloader--done");
      html.classList.remove("is-loading");
      window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
      timers.push(window.setTimeout(() => (el.style.display = "none"), PRELOADER_EXIT + 100));
    };

    // Минимальное время показа — чтобы логотип успел собраться до ухода шторки
    const schedule = () => {
      const wait = Math.max(0, PRELOADER_MIN_SHOW - (performance.now() - started));
      timers.push(window.setTimeout(hide, wait));
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    timers.push(window.setTimeout(hide, PRELOADER_SAFETY));

    return () => {
      window.removeEventListener("load", schedule);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="preloader" aria-hidden>
      <div className="preloader__logo">
        {site.wordmark.map((line, row) => (
          <p key={line} className="flex overflow-hidden">
            {Array.from(line).map((ch, i) => (
              <span key={i} style={{ "--i": row * 5 + i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
