import { transformPage } from "@/lib/notion";
import { shimmer, toBase64 } from "@/lib/utils";
import { PageObjectResponse } from "@notionhq/client";
import dayjs from "dayjs";
import { ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PostCard = ({ page }: { page: PageObjectResponse }) => {
  const transformedPage = transformPage(page);
  return (
    <Link
      href={`/p/${transformedPage.slug}`}
      className="bg-card rounded-xl p-6 border border-border/50 hover:border-border transition-colors group flex flex-col justify-between"
    >
      <article>
        <Image
          src={transformedPage.coverImage || ""}
          alt={transformedPage.title}
          width={500}
          height={500}
          className="w-full mb-4 object-cover rounded-lg h-48"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
        />

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-muted-foreground text-xs">
            {dayjs(transformedPage.created_time).format("MMMM DD, YYYY")}
          </span>
        </div>
        <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
          {transformedPage.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {transformedPage.short_description}
        </p>
      </article>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span className="text-muted-foreground text-xs">
            {transformedPage.author}
          </span>
        </div>
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center gap-2 group ">
          Read More{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </Link>
  );
};

export default PostCard;
