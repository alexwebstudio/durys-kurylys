import { brands, brandsSection } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Бегущая строка брендов. Один и тот же список продублирован, чтобы лента
 * сходилась без шва; дубль скрыт от скринридеров.
 */
export function Brands() {
  return (
    <section aria-label={brandsSection.title} className="section-card bg-graphite !py-10 text-on-dark lg:!py-14">
      <Reveal self className="container-x">
        <p className="t-eyebrow !text-on-dark-muted">{brandsSection.eyebrow}</p>
      </Reveal>

      <div
        className="group mt-7 flex overflow-hidden lg:mt-9"
        style={{ maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)" }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 animate-[brands-marquee_38s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none lg:gap-16 lg:pr-16"
          >
            {brands.map((b) => (
              <li
                key={b}
                className="whitespace-nowrap font-display text-[22px] font-[700] uppercase leading-none tracking-[-0.02em] text-on-dark/55 transition-colors duration-300 hover:text-on-dark lg:text-[30px]"
              >
                {b}
              </li>
            ))}
          </ul>
        ))}
      </div>

      <Reveal self className="container-x mt-7 lg:mt-9">
        <p className="max-w-md text-[15px] leading-relaxed text-on-dark-muted">{brandsSection.note}</p>
      </Reveal>
    </section>
  );
}
