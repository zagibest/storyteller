import { transformPage } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client";
import dayjs from "dayjs";
import Image from "next/image";

const PostCard = ({ page }: { page: PageObjectResponse }) => {
  const transformedPage = transformPage(page);
  return (
    <article className="bg-card rounded-xl p-6 border border-border/50 hover:border-border transition-colors group">
      <Image
        src={transformedPage.coverImage || ""}
        alt={transformedPage.title}
        width={500}
        height={500}
        className="w-full mb-4 object-cover rounded-lg h-48"
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
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs">
          {transformedPage.author}
        </span>
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
          Read More →
        </button>
      </div>
    </article>
  );
};

export default PostCard;
