import type { Metadata } from "next";
import { Community } from "@/components/home-sections";
import { getPublicSiteContent } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Community",
  description: "Connect with the KnightFX Trading Labs community and follow its education channels.",
};

export default async function CommunityPage() {
  const content = await getPublicSiteContent();

  return (
    <main id="main-content" className="home-page">
      <Community links={content?.links ?? {}} />
    </main>
  );
}
