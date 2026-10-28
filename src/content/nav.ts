import { site } from "./site";

export type NavItem = { label: string; href: string };

/** Центр шапки. «Материалы» раскрывает мега-меню. */
export const mainNav: (NavItem & { mega?: boolean })[] = [
  { label: "Материалы", href: "/materials", mega: true },
  { label: "Услуги", href: "/services" },
  { label: "Шоурум", href: "/showroom" },
  { label: "Контакты", href: "/contacts" },
];

/** Полноэкранное мобильное меню. */
export const mobileNav: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Материалы", href: "/materials" },
  { label: "Услуги", href: "/services" },
  { label: "Шоурум", href: "/showroom" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Навигация",
    items: [
      { label: "Материалы", href: "/materials" },
      { label: "Услуги", href: "/services" },
      { label: "Шоурум", href: "/showroom" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
  {
    title: "Компания",
    items: [
      { label: "О компании", href: "/about" },
      { label: "Почему мы", href: "/about#advantages" },
      { label: "Отзывы", href: "/about#reviews" },
      { label: "Регламент", href: "/about#process" },
    ],
  },
];

export const messengers = [
  { label: "WhatsApp", href: site.contacts.whatsapp, icon: "whatsapp" },
  { label: "Instagram", href: site.contacts.instagram, icon: "instagram" },
  { label: "2ГИС", href: site.gis.url, icon: "pin" },
] as const;

export const megaMenu = {
  title: "Материалы",
  text: "Три покрытия для крыши и три системы для стен. В карточке каждого — характеристики, основание и бренды, которые стоят у нас в шоуруме.",
  hubLabel: "Все материалы и характеристики →",
} as const;
