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

const PostCard = ({ page, locale, dict }: PostCardProps) => {
  const transformedPage = transformPage(page);

  const defaultAuthor = locale === "en" ? "Rural Person" : "Хөдөөний хүн";
  const readMoreText = locale === "en" ? "Read" : "Унших";

  return (
    <Link
      href={getLocalePath(locale, `p/${transformedPage.slug}`)}
      className="mongolian-card p-6 group flex flex-col justify-between h-full hover:transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-lg"
    >
      <article>
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <Image
            src={transformedPage.coverImage || "/fallback.png"}
            alt={transformedPage.title}
            width={500}
            height={500}
            className="w-full object-cover h-48 group-hover:scale-105 transition-transform duration-300"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{transformedPage.province}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{dayjs(transformedPage.created_time).format("MMM DD")}</span>
          </div>
        </div>

        <h3 className="text-xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
          {transformedPage.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
          {transformedPage.short_description}
        </p>
      </article>

      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-primary" />
          </div>
          <span className="text-muted-foreground text-xs font-medium">
            {transformedPage.author || defaultAuthor}
          </span>
        </div>
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center gap-2 group">
          <span>{readMoreText}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </Link>
  );
};

export default PostCard;
