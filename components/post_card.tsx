import { type Dictionary } from "@/lib/dictionaries";
import { getLocalePath, type Locale } from "@/lib/i18n";
import { transformPage } from "@/lib/notion";
import { shimmer, toBase64 } from "@/lib/utils";
import { PageObjectResponse } from "@notionhq/client";
import dayjs from "dayjs";
import { ArrowRight, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  page: PageObjectResponse;
  locale: Locale;
  dict: Dictionary;
}

const PostCard = ({ page, locale }: PostCardProps) => {
  const transformedPage = transformPage(page);

  const defaultAuthor = locale === "en" ? "Rural Person" : "Хөдөөний хүн";
  const readMoreText = locale === "en" ? "Read" : "Унших";

  return (
    <Link
      href={getLocalePath(locale, `p/${transformedPage.slug}`)}
      className="group relative flex flex-col justify-between rounded-2xl border border-border/40 shadow-sm backdrop-blur-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background/60 p-6"
    >
      <article>
        {/* Cover Image */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <Image
            src={transformedPage.coverImage || "/fallback.png"}
            alt={transformedPage.title}
            width={500}
            height={500}
            className="w-full object-cover h-48 group-hover:scale-105 group-hover:rotate-[0.5deg] transition-transform duration-500 ease-out"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Meta Info */}
        <div className="flex items-center space-x-4 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{transformedPage.province}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{dayjs(transformedPage.created_time).format("MMM DD")}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-serif text-foreground mb-2 leading-snug relative inline-block">
          <span className="group-hover:underline decoration-primary/60 underline-offset-4 transition-all">
            {transformedPage.title}
          </span>
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
          {transformedPage.short_description}
        </p>
      </article>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/20">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-primary" />
          </div>
          <span className="text-muted-foreground text-xs font-medium">
            {transformedPage.author || defaultAuthor}
          </span>
        </div>

        <span className="relative text-sm font-medium text-primary flex items-center gap-1 group">
          {readMoreText}
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
        </span>
      </div>
    </Link>
  );
};

export default PostCard;
