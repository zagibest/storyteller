import FeaturedCard from "@/components/featured";
import PostCard from "@/components/post_card";
import { fetchPages, getFeaturedPage } from "@/lib/notion";

export default async function Home() {
  const pages = await fetchPages();
  const featuredPage = getFeaturedPage(pages);
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {featuredPage && (
          <section className="mb-16">
            <FeaturedCard page={featuredPage} />
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif text-foreground">Нийтлэлүүд</h2>
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Бүх нийтлэл →
            </a>
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
