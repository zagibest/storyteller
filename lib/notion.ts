import {
  BlockObjectResponse,
  Client,
  PageObjectResponse,
} from "@notionhq/client";
import { unstable_cache } from "next/cache";

export interface TransformedPage {
  id: string;
  title: string;
  slug: string;
  author: string;
  status: string;
  featured: boolean;
  coverImage: string | null;
  cover: string | null;
  url: string;
  last_edited_time: string;
  created_time: string;
  short_description: string;
  province: string;
}

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const fetchPages = unstable_cache(
  async () => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Status",
        select: {
          equals: "Live",
        },
      },
    });
    return response.results as PageObjectResponse[];
  },
  ["pages"],
  {
    revalidate: 120,
  }
);

export const fetchBySlug = unstable_cache(
  async (slug: string) => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    return response.results[0] as PageObjectResponse;
  },
  ["page"],
  {
    revalidate: 120,
  }
);

export const fetchPageBlocks = unstable_cache(
  async (pageId: string) => {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });

    return response.results as BlockObjectResponse[];
  },
  ["page-blocks"],
  {
    revalidate: 120,
  }
);

export const transformPage = (page: PageObjectResponse): TransformedPage => {
  const { properties, cover, url, last_edited_time, id } = page;

  return {
    id: id,
    title: getTitle(properties.Name),
    slug: getRichTextContent(properties.Slug),
    author: getRichTextContent(properties.Author),
    status: getSelectValue(properties.Status),
    featured: getCheckboxValue(properties.Featured),
    coverImage: getFileUrl(properties["Cover Image"]),
    cover: cover?.type === "external" ? cover.external.url : null,
    url: url,
    last_edited_time: last_edited_time,
    created_time: getCreatedTime(properties.Created),
    short_description: getRichTextContent(properties["Short Description"]),
    province: getRichTextContent(properties.Province),
  };
};

// Helper function to safely extract rich text content
const getRichTextContent = (property: unknown): string => {
  if (
    property &&
    typeof property === "object" &&
    "type" in property &&
    property.type === "rich_text" &&
    "rich_text" in property &&
    Array.isArray(property.rich_text) &&
    property.rich_text.length > 0
  ) {
    return (property.rich_text[0] as { plain_text?: string })?.plain_text || "";
  }
  return "";
};

// Helper function to safely extract file URL
const getFileUrl = (property: unknown): string | null => {
  if (
    property &&
    typeof property === "object" &&
    "type" in property &&
    property.type === "files" &&
    "files" in property &&
    Array.isArray(property.files) &&
    property.files.length > 0
  ) {
    return (
      (property.files[0] as { file?: { url?: string } })?.file?.url || null
    );
  }
  return null;
};

// Helper function to safely extract title
const getTitle = (property: unknown): string => {
  if (
    property &&
    typeof property === "object" &&
    "type" in property &&
    property.type === "title" &&
    "title" in property &&
    Array.isArray(property.title) &&
    property.title.length > 0
  ) {
    return (property.title[0] as { plain_text?: string })?.plain_text || "";
  }
  return "";
};

// Helper function to safely extract select value
const getSelectValue = (property: unknown): string => {
  if (
    property &&
    typeof property === "object" &&
    "type" in property &&
    property.type === "select" &&
    "select" in property &&
    property.select
  ) {
    return (property.select as { name?: string })?.name || "";
  }
  return "";
};

// Helper function to safely extract checkbox value
const getCheckboxValue = (property: unknown): boolean => {
  if (
    property &&
    typeof property === "object" &&
    "type" in property &&
    property.type === "checkbox" &&
    "checkbox" in property
  ) {
    return Boolean(property.checkbox);
  }
  return false;
};

// Helper function to safely extract created time
const getCreatedTime = (property: unknown): string => {
  if (
    property &&
    typeof property === "object" &&
    "type" in property &&
    property.type === "created_time" &&
    "created_time" in property
  ) {
    return String(property.created_time || "");
  }
  return "";
};

export const getFeaturedPage = (pages: PageObjectResponse[]) => {
  return pages?.find((page) => getCheckboxValue(page.properties.Featured));
};
