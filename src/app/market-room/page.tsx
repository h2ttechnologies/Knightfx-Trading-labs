import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { insights } from "@/lib/content";
import { getPublicSiteContent } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Market Room",
  description: "Demonstration articles about market structure, analysis process and trading discipline. No live market calls are published.",
};

export default async function MarketRoomPage() {
  const publicContent = await getPublicSiteContent();
  const availableInsights = publicContent?.insights.length ? publicContent.insights : insights;
  return (
    <main id="main-content" className="inner-page">
      <div className="page-width">
        <div className="breadcrumb"><Link href="/#home">Home</Link><span>/</span><span>Market room</span></div>
        <header className="inner-hero">
          <span className="eyebrow"><i /> INSIDE THE MARKETS</span>
          <h1>Observe the market.<br /><em>Strengthen your process.</em></h1>
          <p>Explore market structure, session context and trading discipline through educational examples. No live analysis, prices or trade calls are published here.</p>
        </header>
        <div className="market-demo-banner" style={{ marginTop: 22 }}><span className="demo-mark">DEMO</span><p>Every article on this page is demonstration content, not current market analysis or investment advice.</p></div>
        <div className="inner-list">
          {availableInsights.map((post) => (
            <Link href={`/market-room/${post.slug}`} key={post.slug} className="inner-card">
              <div className="inner-card-index"><span>{post.category}</span><span>{post.readingTime}</span></div>
              <h2>{post.title}</h2><p>{post.excerpt}</p>
              <div className="inner-card-foot"><span>Demonstration preview</span><ArrowUpRight size={15} /></div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
