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

const FeaturedCard = ({ page }: { page: PageObjectResponse }) => {
  const transformedPage = transformPage(page);
  return (
    <Link href={`/p/${transformedPage.slug}`}>
      <div className="mongolian-card p-8 group hover:transform hover:-translate-y-1 transition-all duration-300">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="earth-accent px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Онцлох түүх</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Хөдөө</span>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
              {transformedPage.title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
              {transformedPage.short_description}
            </p>

            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-foreground text-sm font-medium">
                    {transformedPage.author || "Хөдөөний хүн"}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  {dayjs(transformedPage.created_time).format("MMMM DD, YYYY")}
                </span>
              </div>
            </div>

            <div>
              <button className="steppe-button flex items-center space-x-2 group">
                <span>Бүтнээр нь унших</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 relative w-full h-full min-h-[300px]">
            {transformedPage.coverImage ? (
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src={transformedPage.coverImage}
                  alt={transformedPage.title}
                  fill
                  priority
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ) : (
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mongolian-pattern">
                <div className="text-center">
                  <Mountain className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <span className="text-muted-foreground">Зураг байхгүй</span>
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
