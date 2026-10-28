import { site } from "./site";

/**
 * Отзывы — дословно из карточки компании в 2ГИС, вместе с именами и датами.
 * Ничего не переписано «покрасивее» и ничего не добавлено: три отзыва — значит три.
 * Источник: {@link site.gis.reviewsUrl}
 */

export const reviewsSection = {
  eyebrow: "Отзывы",
  lines: ["Что пишут", "в *2ГИС*"],
  lead: `Рейтинг ${site.gis.rating} из 5 — ${site.gis.ratingsCount} оценок и ${site.gis.reviewsCount} отзыва. Мы приводим их как есть, со ссылкой на источник.`,
  link: "Читать в 2ГИС →",
  note: "Отзывов пока немного — компания редко просит их оставлять. Зато все они настоящие.",
} as const;

export const reviews = [
  {
    author: "Valikhan Kudaibergenov",
    date: "15 июня 2022",
    rating: 5,
    text: "Отличный выбор Черепицы, сделали эскизный проэкт дома, помогли с выбором, очень довольный Рахмет Вам !!!",
  },
  {
    author: "Nurdaulet Saduov",
    date: "15 марта 2023",
    rating: 5,
    text: "Отличный сервис !",
  },
  {
    author: "Мурат Бейсенов",
    date: "2 апреля 2026",
    rating: 5,
    text: "Всё ок.",
  },
] as const;
