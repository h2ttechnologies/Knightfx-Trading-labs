import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { courses } from "@/lib/content";
import { getPublicCourse } from "@/lib/public-content";

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getPublicCourse(slug) ?? courses.find((item) => item.slug === slug);
  return { title: course?.title ?? "Academy curriculum", description: course?.description };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getPublicCourse(slug) ?? courses.find((item) => item.slug === slug);
  if (!course) notFound();

  return (
    <main id="main-content" className="inner-page">
      <div className="page-width">
        <div className="breadcrumb"><Link href="/#home">Home</Link><span>/</span><Link href="/academy">Academy</Link><span>/</span><span>{course.title}</span></div>
        <header className="inner-hero academy-detail-head">
          <div><span className="eyebrow"><i /> CURRICULUM PREVIEW / {course.number}</span><h1>{course.title}</h1><p>{course.description}</p></div>
          <span className="course-level-badge">{course.level}</span>
        </header>
        <div className="course-syllabus">
          {course.topics.map((topic, index) => <div className="syllabus-item" key={topic}><span>{String(index + 1).padStart(2, "0")}</span>{topic}</div>)}
        </div>
        <aside className="article-aside" style={{ maxWidth: 650 }}><strong>LESSONS NOT PUBLISHED</strong><p>This page is an editable curriculum outline. Course material will be listed here once lessons have been prepared and reviewed.</p></aside>
        <p style={{ marginTop: 28 }}><Link className="text-link" href="/academy"><ArrowLeft size={15} /> Back to all learning paths</Link></p>
      </div>
    </main>
  );
}
