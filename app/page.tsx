import FeaturedCard from "@/components/featured";
import PostCard from "@/components/post_card";
import { fetchPages, getFeaturedPage } from "@/lib/notion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const pages = await fetchPages();
  const featuredPage = getFeaturedPage(pages);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
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
      </main>
    </div>
  );
}
