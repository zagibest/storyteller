import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isValidLocale, locales } from "./lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Check if we have a preferred locale from headers
    const preferredLocale = getPreferredLocale(request);

    // If it's the default locale, rewrite to the locale path internally
    if (preferredLocale === defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocale}${pathname}`;
      return NextResponse.rewrite(url);
    }

    // Redirect to the preferred locale
    const redirectUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If pathname has locale, validate it
  const locale = pathname.split("/")[1];
  if (!isValidLocale(locale)) {
    // Invalid locale, redirect to default
    const newPathname = pathname.replace(`/${locale}`, "");
    const redirectUrl = new URL(newPathname || "/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

function getPreferredLocale(request: NextRequest): string {
  // Check for locale preference in cookies
  const cookieLocale = request.cookies.get("preferred-locale")?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage) {
    // Simple parsing - look for 'en' or 'mn' in the header
    if (acceptLanguage.includes("en")) {
      return "en";
    }
    if (acceptLanguage.includes("mn")) {
      return "mn";
    }
  }

  return defaultLocale;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static assets
    "/((?!_next|api|favicon|sitemap|robots|manifest|sw|workbox-|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
