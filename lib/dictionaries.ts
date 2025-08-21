import type { Locale } from "./i18n";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  mn: () => import("../dictionaries/mn.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.warn(`Failed to load dictionary for locale: ${locale}`, error);
    // Fallback to Mongolian if English fails, or vice versa
    const fallbackLocale = locale === "en" ? "mn" : "en";
    return await dictionaries[fallbackLocale]();
  }
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
