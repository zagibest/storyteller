import { getDictionary } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import Image from "next/image";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="min-h-screen  mt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className=" mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {dict.about.title}
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed">
                {dict.about.subtitle}
              </p>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg">
                <p className="text-base text-gray-700 leading-relaxed font-medium">
                  {dict.about.mission}
                </p>
              </div>
            </div>

            {/* Mongolia Map Section */}
            <div className="w-full">
              <Image
                src="/map.svg"
                alt="Mongolia Map"
                width={1200}
                height={1200}
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className=" mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {dict.about.ourTeam}
            </h2>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {dict.about.teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center space-y-4">
                  {/* Avatar placeholder with initials */}
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-xs lg:text-sm mt-1">
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
