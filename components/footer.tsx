import { type Dictionary } from "@/lib/dictionaries";
import { getLocalePath, type Locale } from "@/lib/i18n";
import { Mountain } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  locale: Locale;
  dict?: Dictionary;
}

const Footer = ({ locale }: FooterProps) => {
  const footerContent = {
    en: {
      tagline: "Rural Life Stories",
      storytellers: "storytellers",
      provinces: "provinces",
      stories: "stories",
      description:
        "Documenting rural life in Mongolia, preserving stories of rural people.",
      rights: "All rights reserved",
    },
    mn: {
      tagline: "Хөдөөний хүний түүх",
      storytellers: "түүхч",
      provinces: "аймаг",
      stories: "түүх",
      description:
        "Монголын хөдөөний амьдралыг баримтлан, 'Хөдөөний хүн'-ийн түүхийг хадгалж үлдэх төсөл.",
      rights: "Бүх эрх хуулиар хамгаалагдсан",
    },
  };

  const content = footerContent[locale] || footerContent.mn;

  return (
    <footer className="bg-card/50 border-t border-border/40 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center gap-8">
          {/* Brand Section */}
          <div>
            <Link
              href={getLocalePath(locale)}
              className="flex items-center space-x-3 mb-6 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <Mountain className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-serif text-foreground font-bold">
                  Story-Capturers
                </h3>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Story-Capturers. {content.rights}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
