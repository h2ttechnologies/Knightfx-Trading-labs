import type { Metadata } from "next";
import { PartnersDirectory } from "@/components/partners-directory";
import { getPublicSiteContent } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Explore KnightFX Trading Labs partner firms and broker resources.",
};

export default async function PartnershipsPage() {
  const content = await getPublicSiteContent();

  return (
    <main id="main-content" className="home-page">
      <PartnersDirectory items={content?.partners ?? []} />
    </main>
  );
}
