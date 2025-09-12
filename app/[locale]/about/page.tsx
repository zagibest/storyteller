import MongoliaDotMap from "@/components/map";
import TeamMember from "@/components/TeamMember";
import { getDictionary } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import { Quote } from "lucide-react";
import Image from "next/image";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

interface TeamMember {
  name: string;
  image: string;
  province: string;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="min-h-screen mt-24">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="w-full">
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
            </div>

            {/* Mongolia Map Section */}
            <div className="relative w-full ">
              <MongoliaDotMap dotColor="orange" dotSize={6} dotSpacing={10} />
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              {locale === "mn" ? "Бидний баг" : "Our Team"}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <TeamMember
              name={{ en: "Ch. Myadaggarav", mn: "Ч. Мядаггарав" }}
              title={{ en: "Project Manager", mn: "Төслийн санаачлагч" }}
              image="/team/myadaggarav.jpg"
              locale={locale}
            />
            <TeamMember
              name={{ en: "U. Byambanyam", mn: "У. Бямбаням" }}
              title={{ en: "Project Advisor", mn: "Төслийн Зөвлөх" }}
              description={{
                en: 'Literature researcher, Founder of "Urga Books" publishing house',
                mn: 'Утга зохиол судлаач, "Urga Books" хэвлэлийн газрын үүсгэн байгуулагч',
              }}
              image="/team/byambanyam.jpg"
              locale={locale}
            />

            <TeamMember
              name={{ en: "B. Tsolmon", mn: "Б. Цолмон" }}
              title={{ en: "Project Advisor", mn: "Төслийн Зөвлөх" }}
              description={{
                en: "Executive Director of Zorig Foundation",
                mn: "Зориг сангийн гүйцэтгэх захирал",
              }}
              image="/team/tsolmon.jpg"
              locale={locale}
            />

            <TeamMember
              name={{ en: "U. Battenerelt", mn: "У. Бат-Энэрэлт" }}
              title={{ en: "Project Moderator", mn: "Төслийн модератор" }}
              image="/team/batenerelt.jpg"
              locale={locale}
            />
            <TeamMember
              name={{ en: "G. Zandan-Ochir", mn: "Г. Зандан-Очир" }}
              title={{ en: "Web Developer", mn: "Веб хөгжүүлэгч" }}
              image="/team/zandanochir.jpg"
              locale={locale}
            />
          </div>
        </section>
        {/* Divider */}
        <div className="my-20 flex justify-center">
          <div className="w-24 h-1 bg-primary/30 rounded-full" />
        </div>
        <section className="mt-16">
          <div className="relative bg-white backdrop-blur-sm rounded-xl p-8 border border-border shadow-lg">
            <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/40" />
            <p className="text-base text-foreground leading-relaxed font-medium">
              {dict.about.mission}
            </p>
            <div className="flex justify-center gap-8 mt-8">
              <Image
                src="/lang_center_swat.jpg"
                alt="Lang"
                width={300}
                height={50}
              />
              <Image src="/zorig_san.png" alt="Lang" width={50} height={50} />
            </div>
          </div>
        </section>

        <section>
          <p className="text-muted-foreground text-sm mt-16">
            This project was funded [in part] by the Eugene M. Lang Opportunity
            Scholarship (LOS) Program. Each year, the LOS Program selects up to
            six (6) members of Swarthmore College’s sophomore class as Lang
            Scholars. Selection criteria include distinguished academic and
            extra-curricular achievement, leadership qualities and demonstrated
            commitment to civic and social responsibility. As its central
            feature, the LOS Program offers each Lang Scholar the opportunity
            and related funding to conceive, design and carry out a project that
            creates a needed social resource and/or effects a significant social
            change or improved condition of a community in the United States or
            abroad. In addition, it offers each Lang Scholar a diverse
            succession of undergraduate and graduate financial and other
            benefits. The Program was conceived and endowed by Eugene M. Lang
            ’38.
          </p>
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
