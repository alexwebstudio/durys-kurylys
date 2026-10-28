import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Монограмма DK: геометрическая «D», общая стойка с «K» и длинная диагональ,
 * перечёркивающая знак, — как на табличке и вывеске офиса на Пошанова, 31.
 * Нарисована по фото: это аппроксимация, а не оригинальный файл логотипа.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 28"
      width={32}
      height={26}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden
      className={className}
    >
      {/* D */}
      <path d="M2.8 2.4v23.2h5.1l5.6-6.1V8.5L7.9 2.4z" />
      {/* K: стойка и нижняя нога */}
      <path d="M18.6 2.4v23.2M18.6 14l11.6 11.6" />
      {/* верхняя диагональ, уходящая через знак */}
      <path d="M31.4 1.2L13 19.5" />
    </svg>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} — на главную`}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <Mark className="shrink-0" />
      <span className="t-logo">{site.name}</span>
    </Link>
  );
}
