import Image from "next/image";

interface TeamMemberProps {
  name: {
    en: string;
    mn: string;
  };
  title: {
    en: string;
    mn: string;
  };
  description?: {
    en: string;
    mn: string;
  };
  image: string;
  locale: string;
}

export default function TeamMember({
  name,
  title,
  description,
  image,
  locale,
}: TeamMemberProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Background Image */}
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={image}
          alt={locale === "mn" ? name.mn : name.en}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-2 text-white">
              {locale === "mn" ? name.mn : name.en}
            </h3>
            <p className="text-sm text-white/90 mb-3 font-medium">
              {locale === "mn" ? title.mn : title.en}
            </p>
            {description && (
              <p className="text-xs text-white/80 leading-relaxed  group-hover:opacity-100 transition-opacity duration-300 delay-100">
                {locale === "mn" ? description.mn : description.en}
              </p>
            )}
          </div>
        </div>

        {/* Subtle border on hover */}
        <div className="absolute inset-0 ring-2 ring-white/20 ring-inset opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      </div>
    </div>
  );
}
