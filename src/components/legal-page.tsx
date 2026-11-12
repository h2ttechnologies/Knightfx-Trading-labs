import Link from "next/link";

export type LegalSection = { title: string; paragraphs: string[] };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main id="main-content" className="inner-page">
      <div className="page-width">
        <div className="breadcrumb"><Link href="/#home">Home</Link><span>/</span><span>{title}</span></div>
        <header className="inner-hero"><span className="eyebrow"><i /> KNIGHTFX TRADING LABS</span><h1>{title}</h1><p>{intro}</p></header>
        <div className="legal-content">
          {sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>)}
          <p style={{ marginTop: 38, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.12)", color: "#73736d", fontSize: 9 }}>This page is a general website draft and should be reviewed and completed by the site owner before publication. Add the applicable business identity, jurisdiction, contact details and retention practices.</p>
        </div>
      </div>
    </main>
  );
}
