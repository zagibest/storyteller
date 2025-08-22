import { getDictionary } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import Image from "next/image";
import { Quote } from "lucide-react";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="min-h-screen mt-24">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight relative inline-block">
                <span className="relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-16 after:h-1 after:bg-primary">
                  {dict.about.title}
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {dict.about.subtitle}
              </p>

              {/* Mission as a quote card */}
              <div className="relative bg-background/70 backdrop-blur-sm rounded-xl p-8 border border-border shadow-lg">
                <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/40" />
                <p className="text-base text-foreground leading-relaxed font-medium">
                  {dict.about.mission}
                </p>
              </div>
            </div>

            {/* Mongolia Map Section */}
            <div className="relative w-full flex justify-center">
              <div className="relative w-[90%] max-w-lg">
                <Image
                  src="/map.svg"
                  alt="Mongolia Map"
                  width={1200}
                  height={1200}
                  className="drop-shadow-lg hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-xl border-2 border-primary/20 animate-pulse pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="my-20 flex justify-center">
          <div className="w-24 h-1 bg-primary/30 rounded-full" />
        </div>

        {/* Team Section */}
        <section className="mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4 relative inline-block">
              <span className="relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
                {dict.about.ourTeam}
              </span>
            </h2>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
            {dict.about.teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-background/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center space-y-4">
                  {/* Avatar placeholder with accent */}
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-primary font-bold text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground text-base">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.about.title,
    description: dict.about.subtitle,
  };
}
