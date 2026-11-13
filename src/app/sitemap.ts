import type { MetadataRoute } from "next";
import { courses, insights } from "@/lib/content";
import { getPublicSiteContent } from "@/lib/public-content";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl;

  const content = await getPublicSiteContent();
  const courseItems = content?.courses.length ? content.courses : courses;
  const insightItems = content?.insights.length ? content.insights : insights;
  const paths = ["", "/about", "/mentorship", "/partnerships", "/community", "/academy", "/market-room", "/privacy", "/terms", "/risk-disclosure", "/affiliate-disclosure", ...courseItems.map((course) => `/academy/${course.slug}`), ...insightItems.map((insight) => `/market-room/${insight.slug}`)];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
