// Скачивает стоковые фото с Unsplash в assets-src/photos/stock/.
// Лицензия Unsplash: бесплатно для коммерческого использования, атрибуция не обязательна
// (https://unsplash.com/license). Нельзя продавать фото как есть и собирать из них
// конкурирующий фотосток.
//
// ⚠ Это иллюстрации технологии и материалов, а НЕ объекты Durys Kurylys.
// Реальные фото компании лежат в assets-src/photos/real/ — их и только их
// показываем там, где речь идёт о самой компании (шоурум, офис, контакты).
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "assets-src", "photos", "stock");

/** имя файла → id фото на images.unsplash.com */
export const STOCK = {
  "hero-home": "1758299892077-14ecca1c6a86", // тёмный современный дом под облачным небом
  "hero-materials": "1784932328948-84764ab7924e", // кровля из гибкой черепицы, скаты и фронтоны
  "hero-services": "1763665814965-b5c4b3547908", // бригада укладывает черепицу
  "home-process": "1643225523483-e2c434191bba", // кровельщик несёт пачку гонтов
  "mat-gibkaya-cherepica": "1791955455643-26813110f80e", // нахлёст битумных гонтов
  "mat-metallocherepica": "1673645652350-6a4c31c1c78f", // металлочерепица на фоне неба
  "mat-kompozitnaya-cherepica": "1787504543471-c95423873995", // тёмная черепичная кровля со слуховыми окнами
  "mat-fasadnye-paneli": "1773101883541-42a4881daef3", // сайдинг с окном крупным планом
  "mat-ventfasad": "1536501483244-925da0b87089", // фасад из крупноформатных плит
  "mat-shtukaturnyj-fasad": "1768941124452-9a624bb5c8ab", // оштукатуренный дом
  "svc-skatnaya-krovlya": "1778164909438-c27c813cb480", // новый дом с тёмной кровлей в стройке
  "svc-metallocherepica": "1779941674155-429b26d214c4", // фальцевая металлическая кровля
  "svc-gidroizolyaciya": "1637035640168-ff7dad2852f8", // плоская кровля с мембраной и надстройкой
  "svc-uteplenie": "1789577759972-9e5b9134f72d", // утеплитель между стропил
  "svc-fasadnye-paneli": "1786295866839-d17f879c65cd", // монтаж обшивки и оконной планки
  "svc-ventfasad": "1617893423712-9667576ffc1e", // навесной фасад общественного здания
  "svc-shtukaturka": "1785940894556-24a1b8f42545", // штукатурные работы на фасаде с лесов
  "svc-vodostok": "1634853982486-c06f0e17940f", // водосточный жёлоб по кромке кровли
};

await mkdir(dir, { recursive: true });
const credits = ["# Стоковые фото (Unsplash License)", "", "Иллюстрации технологии, не объекты компании.", ""];
for (const [name, id] of Object.entries(STOCK)) {
  const url = `https://images.unsplash.com/photo-${id}?w=2400&q=85&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  await writeFile(path.join(dir, `${name}.jpg`), Buffer.from(await res.arrayBuffer()));
  credits.push(`- ${name}.jpg — https://unsplash.com/photos/${id}`);
  console.log("✓", name);
}
await writeFile(path.join(dir, "SOURCES.md"), credits.join("\n") + "\n");
