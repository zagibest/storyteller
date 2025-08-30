import { getDictionary } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import { Facebook, Instagram, Mail } from "lucide-react";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const instagramUrl = "https://instagram.com/storycapturers";
  const facebookUrl = "https://www.facebook.com/storycapturers/";
  const emailAddress = "admin@storycapturers.org";

  return (
    <main className="min-h-screen mt-24">
      <div className="container mx-auto px-4 py-16">
        <section className="w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight relative inline-block">
              <span className="relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-16 after:h-1 after:bg-primary">
                {dict.contact.title}
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {dict.contact.subtitle}
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                <Instagram className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  {dict.contact.instagram}
                </span>
                <span className="text-base font-medium text-foreground">
                  @storycapturers
                </span>
              </div>
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                <Facebook className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  {dict.contact.facebook}
                </span>
                <span className="text-base font-medium text-foreground">
                  facebook.com/storycapturers
                </span>
              </div>
            </a>

            <a
              href={`mailto:${emailAddress}`}
              className="group bg-background/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  {dict.contact.email}
                </span>
                <span className="text-base font-medium text-foreground">
                  {emailAddress}
                </span>
              </div>
            </a>
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
    title: dict.contact.title,
    description: dict.contact.subtitle,
  };
}
