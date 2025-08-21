import FeaturedCard from "@/components/featured";
import { DotPattern } from "@/components/magicui/dot-pattern";
import PostCard from "@/components/post_card";
import { fetchPages, getFeaturedPage } from "@/lib/notion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const pages = await fetchPages();
  const featuredPage = getFeaturedPage(pages);

  return (
    <main className="min-h-screen relative">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="container mx-auto px-4 py-16 mt-20">
        {/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background"></div> */}
        {featuredPage && (
          <section className="mb-16" id="stories">
            <FeaturedCard page={featuredPage} />
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif text-foreground mb-2">
                Бүх түүхүүд
              </h2>
              <p className="text-muted-foreground">
                Хөдөөний хүний амьдралын түүхүүд
              </p>
            </div>
            <Link
              href="#"
              className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center space-x-2 group"
            >
              <span>Бүх түүхүүд</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages?.map((page) => (
              <PostCard key={page.id} page={page} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
