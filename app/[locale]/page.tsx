import FeaturedCard from "@/components/featured";
import { DotPattern } from "@/components/magicui/dot-pattern";
import PostCard from "@/components/post_card";
import { getDictionary } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import { fetchPages, getFeaturedPage } from "@/lib/notion";
import { cn, shimmer, toBase64 } from "@/lib/utils";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pages = await fetchPages();
  const featuredPage = getFeaturedPage(pages);

  return (
    <main className="min-h-screen relative">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="container mx-auto px-4 py-16 pt-32 max-w-screen-xl">
        {featuredPage && (
          <section className="mb-16" id="stories">
            <FeaturedCard page={featuredPage} locale={locale} />
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif text-foreground mb-2">
                {dict.home.title}
              </h2>
              <p className="text-muted-foreground">{dict.home.subtitle}</p>
            </div>
            <Link
              href="#"
              className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center space-x-2 group"
            >
              <span>{dict.home.allStoriesLink}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages?.map((page) => (
              <PostCard key={page.id} page={page} locale={locale} />
            ))}
          </div>
          <section className="mt-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4 relative inline-block">
                <span className="relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
                  {dict.about.ourTeam}
                </span>
              </h2>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {dict.about.teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                >
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative text-center space-y-4">
                    {/* Profile Image */}
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-500 group-hover:scale-105">
                        <Image
                          src={member.image || "/fallback.png"}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          placeholder={`data:image/svg+xml;base64,${toBase64(
                            shimmer(96, 96)
                          )}`}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold text-lg"
                          style={{ display: "none" }}
                        >
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>

                      {/* Decorative ring */}
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md" />
                    </div>

                    {/* Member Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-foreground text-lg leading-tight">
                          {member.name}
                        </h3>
                      </div>

                      {/* Province/Location */}
                      <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{member.province}</span>
                      </div>
                    </div>

                    {/* Hover effect indicator */}
                    {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" /> */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
