import { transformPage } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

const FeaturedCard = ({ page }: { page: PageObjectResponse }) => {
  const transformedPage = transformPage(page);
  return (
    <Link href={`/p/${transformedPage.slug}`}>
      <div className="bg-card rounded-2xl p-8 border border-border/50">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Онцлох
              </span>
              {/* <span className="text-muted-foreground text-sm">
                {dayjs(transformedPage.created_time).format("MMMM DD, YYYY")}
              </span> */}
            </div>
            <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-4 leading-tight">
              {transformedPage.title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {transformedPage.short_description}
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-muted-foreground text-sm">
                  {transformedPage.author}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-muted-foreground text-sm">
                  {dayjs(transformedPage.created_time).format("MMMM DD, YYYY")}
                </span>
              </div>
            </div>
            <div>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Read Full Story
              </button>
            </div>
          </div>
          <div className="lg:col-span-1 relative">
            {transformedPage.coverImage ? (
              <Image
                src={transformedPage.coverImage}
                alt={transformedPage.title}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">
                  No image available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
