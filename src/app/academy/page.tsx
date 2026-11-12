import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { courses } from "@/lib/content";
import { getPublicSiteContent } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Academy",
  description: "Explore the KnightFX Trading Labs curriculum map. Lessons are not yet published.",
};

export default async function AcademyPage() {
  const publicContent = await getPublicSiteContent();
  const availableCourses = publicContent?.courses.length ? publicContent.courses : courses;
  return (
    <main id="main-content" className="inner-page">
      <div className="page-width">
        <div className="breadcrumb"><Link href="/#home">Home</Link><span>/</span><span>Academy</span></div>
        <header className="inner-hero">
          <span className="eyebrow"><i /> LEARN. PRACTICE. IMPROVE.</span>
          <h1>Build a stronger<br /><em>trading foundation.</em></h1>
          <p>Explore the topics KnightFX plans to cover across a structured learning journey. These are curriculum previews; lessons are not published yet.</p>
        </header>
        <div className="inner-list">
          {availableCourses.map((course) => (
            <Link href={`/academy/${course.slug}`} key={course.slug} className="inner-card">
              <div className="inner-card-index"><span>COURSE / {course.number}</span><span>{course.level}</span></div>
              <h2>{course.title}</h2><p>{course.description}</p>
              <div className="inner-card-foot"><span>Curriculum preview · Lessons unpublished</span><ArrowUpRight size={15} /></div>
            </Link>
          ))}
        </div>
        <div className="market-demo-banner" style={{ marginTop: 24 }}><span className="demo-mark">NOTE</span><p>Course outlines are educational planning content. No student outcomes or financial results are promised.</p></div>
      </div>
    </main>
  );
}
