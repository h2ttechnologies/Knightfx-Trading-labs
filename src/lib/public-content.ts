import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Course, Insight } from "@/lib/content";
import type { ResultItem } from "@/components/results-gallery";

export type Partner = {
  id?: string;
  name: string;
  category: "prop_firm" | "broker";
  description: string;
  logo_url?: string | null;
  affiliate_code?: string | null;
  discount?: string | null;
  affiliate_url?: string | null;
  featured?: boolean;
};

export type PublicSiteContent = {
  courses: Course[];
  insights: Insight[];
  results: ResultItem[];
  partners: Partner[];
  links: Record<string, string>;
  mentor: Record<string, string>;
};

const emptyContent: PublicSiteContent = { courses: [], insights: [], results: [], partners: [], links: {}, mentor: {} };

export const getPublicSiteContent = cache(async (): Promise<PublicSiteContent | null> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  let supabase;
  try {
    new URL(url);
    supabase = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  } catch {
    return null;
  }
  const results = await Promise.all([
    supabase.from("courses").select("slug,number,title,description,level,topics,image_url,featured").eq("status", "published").order("position").limit(24),
    supabase.from("market_posts").select("slug,title,category,excerpt,content,reading_time,featured_image_url,featured").eq("status", "published").order("published_at", { ascending: false, nullsFirst: false }).limit(24),
    supabase.from("evidence").select("title,description,category,evidence_url,verification_reference,achieved_at,featured").eq("published", true).eq("verified", true).order("achieved_at", { ascending: false }).limit(60),
    supabase.from("partners").select("id,name,category,description,logo_url,affiliate_code,discount,affiliate_url,featured").eq("status", "active").limit(30),
    supabase.from("site_settings").select("key,value").eq("public", true),
  ]).catch(() => null);
  if (!results) return null;
  const [coursesResult, postsResult, evidenceResult, partnersResult, settingsResult] = results;

  // Public display falls back to the editable local content if a content query
  // is temporarily unavailable; unpublished evidence remains hidden by RLS.
  const data = emptyContent;
  if (!coursesResult.error && coursesResult.data) data.courses = coursesResult.data as unknown as Course[];
  if (!postsResult.error && postsResult.data) {
    data.insights = postsResult.data.map((row) => ({
      slug: row.slug,
      title: row.title,
      category: row.category,
      excerpt: row.excerpt,
      readingTime: row.reading_time ?? "4 min read",
      sections: Array.isArray(row.content) ? row.content as Insight["sections"] : [],
      image: row.featured_image_url,
      featured: row.featured,
    }));
  }
  if (!evidenceResult.error && evidenceResult.data) {
    data.results = evidenceResult.data.map((row) => ({
      image: row.evidence_url,
      title: row.title,
      description: row.description,
      date: row.achieved_at ?? "Verified",
      category: row.category,
      verification: row.verification_reference ?? undefined,
      featured: row.featured,
    }));
  }
  if (!partnersResult.error && partnersResult.data) data.partners = (partnersResult.data as Partner[]).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  if (!settingsResult.error && settingsResult.data) {
    for (const setting of settingsResult.data) {
      const value = setting.value && typeof setting.value === "object" ? setting.value as Record<string, unknown> : {};
      if (setting.key === "social_links") {
        data.links = Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
      }
      if (setting.key === "mentor_profile") {
        data.mentor = Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
      }
    }
  }
  return data;
});

export async function getPublicInsight(slug: string) {
  const content = await getPublicSiteContent();
  return content?.insights.find((post) => post.slug === slug) ?? null;
}

export async function getPublicCourse(slug: string) {
  const content = await getPublicSiteContent();
  return content?.courses.find((course) => course.slug === slug) ?? null;
}
