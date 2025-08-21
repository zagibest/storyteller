import { type Dictionary } from "@/lib/dictionaries";
import { getLocalePath, type Locale } from "@/lib/i18n";
import { BookOpen, MapPin, Mountain, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "./language-switcher";
import TrueFocus from "./TrueFocus/TrueFocus";

interface HeaderProps {
  locale: Locale;
  dict?: Dictionary;
}

const Header = ({ locale, dict }: HeaderProps) => {
  const navigationItems = {
    en: {
      stories: "Stories",
      storytellers: "Storytellers",
      provinces: "Provinces",
      about: "About Us",
      story: "Story",
      tellers: "Tellers",
    },
    mn: {
      stories: "Түүхүүд",
      storytellers: "Түүхч нар",
      provinces: "Аймгууд",
      about: "Бидний тухай",
      story: "Түүх",
      tellers: "Өгүүлэгчид",
    },
  };

  const nav = navigationItems[locale] || navigationItems.mn;

  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm container fixed top-8 right-1/2 translate-x-1/2 transform z-50 rounded-xl w-[90%] md:w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={getLocalePath(locale)}
            className="flex items-center space-x-3 group"
          >
            <Image
              src="/logo_square.png"
              alt="Story Capturers"
              width={50}
              height={50}
            />

            <div className="flex flex-col">
              <TrueFocus
                sentence={
                  locale === "en" ? "Story Capturers" : "Түүх өгүүлэгчид"
                }
                manualMode={false}
                blurAmount={2}
                borderColor="orange"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={getLocalePath(locale)}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{nav.stories}</span>
            </Link>
            <Link
              href="#storytellers"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{nav.storytellers}</span>
            </Link>
            <Link
              href="#provinces"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{nav.provinces}</span>
            </Link>
            <Link
              href={getLocalePath(locale, "about")}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center space-x-2 group"
            >
              <Mountain className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{nav.about}</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />

            <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors">
              <svg
                className="w-6 h-6 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
