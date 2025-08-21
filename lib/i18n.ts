export const defaultLocale = "mn" as const;
export const locales = ["en", "mn"] as const;

export type Locale = (typeof locales)[number];

export const localeNames = {
  en: "English",
  mn: "Монгол",
} as const;

export const localeNamesNative = {
  en: "English",
  mn: "Монгол",
} as const;

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocalePath(locale: Locale, path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (locale === defaultLocale) {
    return `/${cleanPath}`;
  }
  return `/${locale}${cleanPath ? `/${cleanPath}` : ""}`;
}

export function getPathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";

  const firstSegment = segments[0];
  if (isValidLocale(firstSegment)) {
    return "/" + segments.slice(1).join("/");
  }

  return pathname;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return defaultLocale;

  const firstSegment = segments[0];
  if (isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return defaultLocale;
}
