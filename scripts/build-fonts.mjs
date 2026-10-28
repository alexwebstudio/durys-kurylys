// Собирает woff2 из OFL-исходников в assets-src/fonts → public/fonts.
// Все четыре семейства — с github.com/google/fonts под OFL 1.1: пиним ось wght
// в статические начертания и оставляем латиницу + кириллицу (с казахскими) + типографику.
//
// Роли: Unbounded — логотип и вордмарк, Geologica — заголовки, Manrope — текст,
// IBM Plex Mono — техподписи и цифры.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import subsetFont from "subset-font";

const SRC = new URL("../assets-src/fonts/", import.meta.url);
const OUT = new URL("../public/fonts/", import.meta.url);

const RANGES = [
  [0x0020, 0x007e], // Basic Latin
  [0x00a0, 0x00ff], // Latin-1: « » ° ² × ·
  [0x0400, 0x04ff], // Кириллица, включая казахские ә ғ қ ң ө ұ ү һ і
  [0x2010, 0x2027], // тире, кавычки, многоточие
  [0x2030, 0x203a],
  [0x20b8, 0x20b8], // ₸
  [0x20bd, 0x20bd], // ₽
  [0x2116, 0x2116], // №
  [0x2190, 0x2199], // стрелки → ↗
  [0x2212, 0x2212], // минус
];

const text = RANGES.flatMap(([a, b]) =>
  Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i)),
).join("");

const jobs = [
  { src: "Unbounded-VF.ttf", out: "Unbounded-600.woff2", wght: 600 },
  { src: "Unbounded-VF.ttf", out: "Unbounded-700.woff2", wght: 700 },
  { src: "Geologica-VF.ttf", out: "Geologica-700.woff2", wght: 700 },
  { src: "Geologica-VF.ttf", out: "Geologica-800.woff2", wght: 800 },
  { src: "Manrope-VF.ttf", out: "Manrope-400.woff2", wght: 400 },
  { src: "Manrope-VF.ttf", out: "Manrope-500.woff2", wght: 500 },
  { src: "Manrope-VF.ttf", out: "Manrope-600.woff2", wght: 600 },
  { src: "IBMPlexMono-Regular.ttf", out: "IBMPlexMono-400.woff2" },
  // Для og-картинки: satori (next/og) не умеет woff2, поэтому те же начертания в sfnt.
  { src: "Unbounded-VF.ttf", out: "og-Unbounded-700.ttf", wght: 700, format: "sfnt" },
  { src: "Manrope-VF.ttf", out: "og-Manrope-500.ttf", wght: 500, format: "sfnt" },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const input = await readFile(new URL(job.src, SRC));
  const output = await subsetFont(input, text, {
    targetFormat: job.format ?? "woff2",
    ...(job.wght ? { variationAxes: { wght: job.wght } } : {}),
  });
  await writeFile(new URL(job.out, OUT), output);
  console.log(`${job.out.padEnd(26)} ${(output.length / 1024).toFixed(1)} KB`);
}
