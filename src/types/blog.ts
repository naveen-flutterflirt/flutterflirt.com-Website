import { JSONContent } from "@tiptap/react";

export type { JSONContent };

export interface BlogSection {
  id: string;
  blog_id?: string;
  heading: string;
  slug: string;
  content: JSONContent;
  position: number;
  created_at?: string;
  updated_at?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  cover_image?: string;
  image?: string; // compatibility
  category?: string;
  author?: string;
  featured?: boolean;
  status: "draft" | "published";
  published_at?: string | null;
  publishedAt?: string | null; // compatibility
  created_at: string;
  updated_at: string;
  sections: BlogSection[];
}

export interface BlogSectionForm {
  id?: string;
  heading: string;
  content: JSONContent;
  slug?: string;
}

export interface BlogForm {
  title: string;
  excerpt: string;
  cover_image?: string;
  category?: string;
  author?: string;
  featured?: boolean;
  status: "draft" | "published";
  sections: BlogSectionForm[];
}
