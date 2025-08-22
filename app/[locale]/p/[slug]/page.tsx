import { CommentSection } from "@/components/comment_section";
import { getDictionary } from "@/lib/dictionaries";
import { getLocalePath, type Locale } from "@/lib/i18n";
import {
  fetchBySlug,
  fetchPageBlocks,
  notion,
  transformPage,
} from "@/lib/notion";
import { NotionRenderer } from "@notion-render/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowLeft, Calendar, Clock, User, MapPin, Heart } from "lucide-react";
import { ReadingProgress } from "@/components/reading_progress";
import { PostActions } from "@/components/post_actions";
import Link from "next/link";

dayjs.extend(relativeTime);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const dict = await getDictionary(locale);
  const page = await fetchBySlug(slug);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-serif text-foreground mb-4">
            {dict.notFound.title}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            {dict.notFound.subtitle}
          </p>
          <Link
            href={getLocalePath(locale)}
            className="steppe-button inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{dict.notFound.backHome}</span>
          </Link>
        </div>
      </div>
    );
  }

  const blocks = await fetchPageBlocks(page.id);
  const transformedPage = transformPage(page);

  const renderer = new NotionRenderer({
    client: notion,
  });

  const html = await renderer.render(...blocks);

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = html.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Format dates
  const publishedDate = new Date(transformedPage.created_time);
  const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}${getLocalePath(
    locale,
    `p/${transformedPage.slug}`
  )}`;

  // Translations
  const content = {
    en: {
      backToStories: "Back to all stories",
      ruralStory: "Rural Story",
      featuredStory: "Featured Story",
      ruralPerson: "Rural Person",
      minRead: "min read",
      storyInfo: "Story Information",
      storyteller: "Storyteller",
      publishedDate: "Published Date",
      readingTime: "Reading Time",
      wordCount: "Word Count",
      share: "Share",
      bookmark: "Bookmark",
      otherStories: "Other Stories",
      otherStoriesDesc: "Read other stories about rural life.",
      allStories: "All Stories",
    },
    mn: {
      backToStories: "Бүх түүхүүд рүү буцах",
      ruralStory: "Хөдөөний түүх",
      featuredStory: "Онцлох түүх",
      ruralPerson: "Хөдөөний хүн",
      minRead: "мин уншина",
      storyInfo: "Түүхийн мэдээлэл",
      storyteller: "Түүхч",
      publishedDate: "Бичсэн огноо",
      readingTime: "Унших хугацаа",
      wordCount: "Үгийн тоо",
      share: "Хуваалцах",
      bookmark: "Bookmark",
      otherStories: "Бусад түүхүүд",
      otherStoriesDesc: "Хөдөөний хүний амьдралын бусад түүхүүдийг уншаарай.",
      allStories: "Бүх түүхүүд",
    },
  };

  const text = content[locale] || content.mn;

  return (
    <article className="min-h-screen hero-gradient ">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative container mx-auto px-4 py-16 mt-24">
          <Link
            href={getLocalePath(locale)}
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{text.backToStories}</span>
          </Link>

          <div className="space-y-6">
            {/* Category/Status Badge */}
            <div className="flex items-center space-x-4">
              <div className="earth-accent px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{text.ruralStory}</span>
              </div>
              {transformedPage.featured && (
                <div className="sky-accent px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>{text.featuredStory}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight">
              {transformedPage.title}
            </h1>

            {/* Short Description */}
            {transformedPage.short_description && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {transformedPage.short_description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border/50 pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-primary" />
                </div>
                <span>{transformedPage.author || text.ruralPerson}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{dayjs(publishedDate).fromNow()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>
                  {readingTime} {text.minRead}
                </span>
              </div>
              <div className="text-muted-foreground">
                {wordCount.toLocaleString()} words
              </div>
              <PostActions title={transformedPage.title} url={pageUrl} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with side rails */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[auto_1fr_auto] gap-6 md:gap-8">
          {/* Left rail: vertical reading progress (sticky) */}
          <div className="hidden md:block">
            <div className="sticky top-40">
              <ReadingProgress orientation="vertical" className="mx-auto" />
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-3xl mx-auto w-full">
            <div
              className="story-prose animate-in fade-in-50 duration-300"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="mt-10">
              <Link
                href={getLocalePath(locale)}
                className="text-primary hover:text-primary/80 transition-colors font-medium inline-flex items-center space-x-2 group"
              >
                <span>{text.allStories}</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
              </Link>
            </div>
          </div>

          {/* Right rail: post actions (sticky) */}
          <div className="hidden md:block">
            <div className="sticky top-40">
              <PostActions
                title={transformedPage.title}
                url={pageUrl}
                orientation="vertical"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-border/40 container mx-auto px-4 my-8" />
      <CommentSection
        attrs={{
          pageId: page.id,
          pageTitle: transformedPage.title,
          pageUrl: pageUrl,
        }}
      />
    </article>
  );
}
