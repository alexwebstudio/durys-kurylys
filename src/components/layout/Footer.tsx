import Link from "next/link";
import { footerNav, messengers } from "@/content/nav";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icons";
import { Mono } from "@/components/ui/Mono";

export function Footer() {
  return (
    <footer className="px-[var(--page-gutter)] pb-[var(--page-gutter)] pt-[var(--stack-gap)]">
      <div className="section-card bg-surface !pb-0">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="t-caption mb-4 text-ink-muted">{site.descriptor}</p>
              <p className="max-w-sm text-[17px] leading-relaxed">
                {site.slogan}. Монтируем кровлю и фасады {site.cityIn}, материалы — со своего склада и из шоурума
                на Пошанова, 31.
              </p>
            </div>

            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
                <p className="t-eyebrow mb-5">{col.title}</p>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="link-underline pb-0.5 text-[15px]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <address className="not-italic lg:col-span-3">
              <p className="t-eyebrow mb-5">Контакты</p>
              <ul className="flex flex-col gap-3 text-[15px]">
                <li>
                  <a href={site.contacts.phoneHref} className="t-mono link-underline !text-[16px]">
                    {site.contacts.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contacts.email}`} className="link-underline">
                    {site.contacts.email}
                  </a>
                </li>
                <li className="text-ink-muted">{site.contacts.address}</li>
                <li className="text-ink-muted">{site.contacts.hours}</li>
              </ul>
              <ul className="mt-6 flex gap-2" aria-label="Мессенджеры и карты">
                {messengers.map((m) => (
                  <li key={m.label}>
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={m.label}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-line transition-colors hover:bg-surface-2"
                    >
                      <Icon name={m.icon} size={19} />
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </div>

          {/* Нижняя строка: слева реквизиты, по центру политика, справа — прочерк вместо подписи студии */}
          <div className="mt-14 grid gap-4 border-t border-line py-6 text-[13px] text-ink-muted md:grid-cols-3 md:items-center">
            <p className="md:justify-self-start">
              © {new Date().getFullYear()} {site.legal.entity}
            </p>
            <Link href="/privacy" className="link-underline pb-0.5 md:justify-self-center">
              Политика конфиденциальности
            </Link>
            <Mono aria-hidden className="md:justify-self-end">
              —
            </Mono>
          </div>

          {/* Подвал-вордмарк: две строки в разгонку по ширине, нижняя обрезана по базовой линии */}
          <div
            aria-hidden
            className="-mx-1 select-none overflow-hidden font-logo text-[clamp(44px,11.2vw,196px)] font-[700] uppercase leading-[0.84] tracking-[-0.02em] text-ink"
          >
            {site.wordmark.map((line, i) => (
              <p key={line} className="flex justify-between">
                {Array.from(line).map((ch, j) => (
                  <span key={j}>{ch}</span>
                ))}
                {i === 1 && <span className="text-accent">.</span>}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
