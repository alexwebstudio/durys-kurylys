// Готовит public/images из assets-src/photos под имена слотов из src/content/*.ts.
//
// Два источника, и путать их нельзя:
//   real/  — настоящие снимки Durys Kurylys (офис и шоурум, Пошанова 31, из карточки 2ГИС).
//            Только они стоят там, где речь о самой компании.
//   stock/ — Unsplash (scripts/fetch-stock.mjs). Это иллюстрации материала и технологии,
//            а не объекты компании: ни один такой кадр не подписан как «наша работа».
//
// Когда придут реальные снимки с объектов — положите их в real/ и заведите под них слот.
import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const real = (name) => path.join(root, "assets-src", "photos", "real", `${name}.jpg`);
const stock = (name) => path.join(root, "assets-src", "photos", "stock", `${name}.jpg`);
const out = (rel) => path.join(root, "public", "images", rel);

/** Реальные фото: [файл, источник, область исходника, итоговый размер] */
const realJobs = [
  // Вертикальные кадры с телефона → горизонтальные баннеры: берём полосу с объектом.
  ["hero/about.jpg", "office-building", { left: 0, top: 450, width: 1440, height: 810 }, [1920, 1080]],
  ["hero/contacts.jpg", "storefront", { left: 0, top: 120, width: 1280, height: 720 }, [1920, 1080]],
  ["hero/showroom.jpg", "showroom-stands", { left: 0, top: 620, width: 1440, height: 810 }, [1920, 1080]],

  // Карточка в бенто: только кластер стендов, крупно.
  ["home/showroom.jpg", "showroom-samples", { left: 0, top: 330, width: 1020, height: 680 }, [1200, 800]],

  ["showroom/stands.jpg", "showroom-stands", { left: 150, top: 560, width: 1050, height: 1000 }, [1440, 960]],
  ["showroom/samples.jpg", "showroom-samples", { left: 0, top: 0, width: 1440, height: 1080 }, [1440, 960]],
  ["showroom/entrance.jpg", "showroom-entrance", { left: 0, top: 420, width: 1440, height: 960 }, [1440, 960]],
];

/** Стоковые фото: [файл, источник, итоговый размер, позиция обрезки] */
const stockJobs = [
  ["hero/home.jpg", "hero-home", [1920, 1072]],
  ["hero/home-mobile.jpg", "hero-home", [1080, 1350]],
  ["hero/materials.jpg", "hero-materials", [1920, 1080]],
  ["hero/services.jpg", "hero-services", [1920, 1080]],

  ["home/process.jpg", "home-process", [1440, 1080]],

  ["materials/gibkaya-cherepica.jpg", "mat-gibkaya-cherepica", [960, 1200]],
  ["materials/metallocherepica.jpg", "mat-metallocherepica", [960, 1200]],
  ["materials/kompozitnaya-cherepica.jpg", "mat-kompozitnaya-cherepica", [960, 1200]],
  ["materials/fasadnye-paneli.jpg", "mat-fasadnye-paneli", [960, 1200]],
  ["materials/ventfasad.jpg", "mat-ventfasad", [960, 1200]],
  ["materials/shtukaturnyj-fasad.jpg", "mat-shtukaturnyj-fasad", [960, 1200]],

  ["services/skatnaya-krovlya.jpg", "svc-skatnaya-krovlya", [1440, 1080]],
  ["services/metallocherepica.jpg", "svc-metallocherepica", [1440, 1080]],
  ["services/gidroizolyaciya.jpg", "svc-gidroizolyaciya", [1440, 1080]],
  ["services/uteplenie.jpg", "svc-uteplenie", [1440, 1080]],
  ["services/fasadnye-paneli.jpg", "svc-fasadnye-paneli", [1440, 1080]],
  ["services/ventfasad.jpg", "svc-ventfasad", [1440, 1080]],
  ["services/shtukaturka.jpg", "svc-shtukaturka", [1440, 1080]],
  ["services/vodostok.jpg", "svc-vodostok", [1440, 1080]],
];

// Один слот — один файл: иначе где-то на сайте окажется битая картинка.
const outputs = [...realJobs, ...stockJobs].map((j) => j[0]);
const dupes = outputs.filter((o, i) => outputs.indexOf(o) !== i);
if (dupes.length) throw new Error(`Один файл назначен дважды: ${dupes.join(", ")}`);

// Стоковый кадр не используем в двух разных слотах — кроме art direction героя,
// где desktop и mobile это один и тот же снимок в двух кадрировках.
const stockNames = stockJobs.map((j) => j[1]).filter((n) => n !== "hero-home");
if (new Set(stockNames).size !== stockNames.length) throw new Error("Стоковое фото использовано дважды");

for (const dir of ["hero", "home", "materials", "services", "showroom"]) {
  await rm(out(dir), { recursive: true, force: true });
}

for (const [rel, src, region, [w, h]] of realJobs) {
  const target = out(rel);
  await mkdir(path.dirname(target), { recursive: true });
  await sharp(real(src))
    .extract(region)
    .resize(w, h, { fit: "cover", kernel: "lanczos3" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(target);
  console.log("✓", rel, "← real", src);
}

for (const [rel, name, [w, h], position = "centre"] of stockJobs) {
  const target = out(rel);
  await mkdir(path.dirname(target), { recursive: true });
  await sharp(stock(name))
    .resize(w, h, { fit: "cover", position, kernel: "lanczos3" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target);
  console.log("✓", rel, "← stock", name);
}
