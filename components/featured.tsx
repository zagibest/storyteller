import { type Dictionary } from "@/lib/dictionaries";
import { getLocalePath, type Locale } from "@/lib/i18n";
import { transformPage } from "@/lib/notion";
import { shimmer, toBase64 } from "@/lib/utils";
import { PageObjectResponse } from "@notionhq/client";
import dayjs from "dayjs";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Mountain,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedCardProps {
  page: PageObjectResponse;
  locale: Locale;
  dict: Dictionary;
}

const FeaturedCard = ({ page, locale, dict }: FeaturedCardProps) => {
  const transformedPage = transformPage(page);

  const featuredText = locale === "en" ? "Featured Story" : "Онцлох түүх";
  const readFullText = locale === "en" ? "Read Full Story" : "Бүтнээр нь унших";
  const defaultAuthor = locale === "en" ? "Rural Person" : "Хөдөөний хүн";
  const noImageText = locale === "en" ? "No image" : "Зураг байхгүй";

  return (
    <Link href={getLocalePath(locale, `p/${transformedPage.slug}`)}>
      <div className="group relative rounded-2xl border border-border/30 shadow-md hover:shadow-xl transition-all duration-300 bg-background/70 p-8 backdrop-blur-lg">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-4 mb-6">
              {/* Featured Badge */}
              <div className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 bg-primary/10 text-primary">
                <Star className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>{featuredText}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{transformedPage.province}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-4 leading-tight relative inline-block">
              <span className="group-hover:underline decoration-primary/60 underline-offset-4 transition-all">
                {transformedPage.title}
              </span>
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed text-base">
              {transformedPage.short_description}
            </p>

            {/* Author + Date */}
            <div className="flex md:gap-6 gap-4 mb-8 flex-col md:flex-row items-start md:items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {transformedPage.author || defaultAuthor}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {dayjs(transformedPage.created_time).format("MMMM DD, YYYY")}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button className="relative text-primary text-sm font-medium flex items-center gap-2 group">
                <span>{readFullText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-1 relative w-full h-full min-h-[300px]">
            {transformedPage.coverImage ? (
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <Image
                  src={transformedPage.coverImage}
                  alt={transformedPage.title}
                  fill
                  priority
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-1"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ) : (
              <div className="w-full h-full bg-muted/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Mountain className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <span className="text-muted-foreground">{noImageText}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
