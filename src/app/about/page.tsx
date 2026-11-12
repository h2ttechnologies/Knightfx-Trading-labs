import type { Metadata } from "next";
import { AboutOverview } from "@/components/about-overview";
import { Mentor } from "@/components/home-sections";
import { getPublicSiteContent } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about KnightFX Trading Labs, its founder and its disciplined trading education approach.",
};

export default async function AboutPage() {
  const content = await getPublicSiteContent();

  return (
    <main id="main-content" className="home-page">
      <AboutOverview />
      <Mentor profile={content?.mentor} />
    </main>
  );
}
