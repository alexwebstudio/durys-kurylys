import localFont from "next/font/local";

/**
 * Четыре роли, четыре семейства. Все под OFL 1.1, собраны в woff2
 * скриптом scripts/build-fonts.mjs (латиница + кириллица + казахские буквы).
 */

/** Unbounded — только логотип и вордмарк: широкий геометрический дисплей. */
export const unbounded = localFont({
  src: [
    { path: "../../public/fonts/Unbounded-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/Unbounded-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-unbounded",
  display: "swap",
  fallback: ["Impact", "Haettenschweiler", "Arial Black", "sans-serif"],
});

/** Geologica — заголовки: тяжёлый технический гротеск. */
export const geologica = localFont({
  src: [
    { path: "../../public/fonts/Geologica-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/Geologica-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-geologica",
  display: "swap",
  fallback: ["Arial Black", "Helvetica Neue", "Arial", "sans-serif"],
});

/** Manrope — основной текст. */
export const manrope = localFont({
  src: [
    { path: "../../public/fonts/Manrope-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Manrope-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Manrope-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

/** IBM Plex Mono — техподписи, eyebrow, цифры в таблицах. */
export const plexMono = localFont({
  src: [{ path: "../../public/fonts/IBMPlexMono-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Consolas", "monospace"],
});

export const fontVariables = [unbounded.variable, geologica.variable, manrope.variable, plexMono.variable].join(" ");
