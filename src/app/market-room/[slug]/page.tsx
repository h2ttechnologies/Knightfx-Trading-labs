import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { insights } from "@/lib/content";
import { getPublicInsight } from "@/lib/public-content";

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicInsight(slug) ?? insights.find((item) => item.slug === slug);
  return { title: post?.title ?? "Market room preview", description: post?.excerpt };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublicInsight(slug) ?? insights.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main id="main-content" className="inner-page">
      <article className="page-width">
        <div className="breadcrumb"><Link href="/#home">Home</Link><span>/</span><Link href="/market-room">Market room</Link><span>/</span><span>{post.category}</span></div>
        <header className="inner-hero">
          <span className="eyebrow"><i /> DEMONSTRATION CONTENT / {post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>
        <div className="article-layout">
          <div className="article-body">
            {post.sections.map((section, index) => <section key={section.heading}><span className="eyebrow">SECTION / {String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2><p>{section.body}</p></section>)}
          </div>
          <aside className="article-aside"><strong>EDUCATIONAL EXAMPLE</strong><p>This demonstration article contains no live prices or trade recommendations. Market conditions change, and the examples are not financial advice.</p><p>{post.readingTime} · KnightFX Trading Labs</p></aside>
        </div>
        <p style={{ marginTop: 32 }}><Link className="text-link" href="/market-room"><ArrowLeft size={15} /> Back to the market room</Link></p>
      </article>
    </main>
  );
}
