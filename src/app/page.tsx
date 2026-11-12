import { HomeSections } from "@/components/home-sections";
import { getPublicSiteContent } from "@/lib/public-content";

export default async function Home() {
  const content = await getPublicSiteContent();
  return (
    <main id="main-content" className="home-page">
      <HomeSections content={content} />
    </main>
  );
}
