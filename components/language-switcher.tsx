"use client";

import {
  getLocalePath,
  getPathnameWithoutLocale,
  type Locale,
} from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: Locale) => {
    const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
    const newPath = getLocalePath(newLocale, pathnameWithoutLocale);

    // Set cookie for future visits
    document.cookie = `preferred-locale=${newLocale}; path=/; max-age=31536000`; // 1 year

    // Use replace for better UX to avoid adding to history
    router.replace(newPath);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleLocaleChange(currentLocale === "en" ? "mn" : "en")}
      >
        {currentLocale === "en" ? "EN" : "MN"}
      </Button>
    </div>
  );
}
