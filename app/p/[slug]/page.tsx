import { CommentSection } from "@/components/comment_section";
import {
  fetchBySlug,
  fetchPageBlocks,
  notion,
  transformPage,
} from "@/lib/notion";
import { NotionRenderer } from "@notion-render/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

dayjs.extend(relativeTime);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await fetchBySlug(slug);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-muted-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The story you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
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

  return (
    <article className="min-h-screen hero-gradient">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative container mx-auto px-4 py-16 ">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Stories</span>
          </Link>

          <div className="space-y-6">
            {/* Category/Status Badge */}
            {/* <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                {transformedPage.status}
              </span>
              {transformedPage.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                  Featured Story
                </span>
              )}
            </div> */}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight">
              {transformedPage.title}
            </h1>

            {/* Short Description */}
            {transformedPage.short_description && (
              <p className="text-xl text-muted-foreground leading-relaxed ">
                {transformedPage.short_description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border/50 pt-6">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{transformedPage.author || "Anonymous"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{dayjs(publishedDate).fromNow()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} мин</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div
              className="story-prose"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Story Details */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                  Нийтлэлийн тухай
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Нийтлэгч</span>
                    <span className="font-medium">
                      {transformedPage.author || "Anonymous"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Нийтэлсэн огноо
                    </span>
                    <span className="font-medium">
                      {publishedDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Унших хугацаа</span>
                    <span className="font-medium">{readingTime} мин</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Үгийн тоо</span>
                    <span className="font-medium">
                      {wordCount.toLocaleString()}
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium capitalize">
                      {transformedPage.status}
                    </span>
                  </div> */}
                </div>
              </div>

              {/* Share */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                  Хуваалцах
                </h3>
                <div className="flex space-x-3">
                  <button
                    className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    // onClick={() => {
                    //   navigator.clipboard.writeText(window.location.href);
                    //   toast("Линкийг хууллаа");
                    // }}
                  >
                    Share
                  </button>
                  <button
                    className="flex-1 bg-muted text-muted-foreground py-2 px-4 rounded-md text-sm font-medium hover:bg-muted/80 transition-colors"
                    // onClick={() => {
                    //   const isMac =
                    //     navigator.platform.toUpperCase().indexOf("MAC") >= 0;
                    //   const shortcut = isMac ? "Cmd+D" : "Ctrl+D";

                    //   toast(`${shortcut} дарж хадгалаарай`);
                    // }}
                  >
                    Bookmark
                  </button>
                </div>
              </div>

              {/* Related Stories Placeholder */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                  More Stories
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover more captivating tales from our collection.
                </p>
                <Link
                  href="/"
                  className="inline-block mt-4 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Browse All Stories →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-border/40 container mx-auto px-4 my-8" />
      <CommentSection
        attrs={{
          pageId: page.id,
          pageTitle: transformedPage.title,
          pageUrl: `${process.env.NEXT_PUBLIC_APP_URL}/p/${transformedPage.slug}`,
        }}
      />
    </article>
  );
}
