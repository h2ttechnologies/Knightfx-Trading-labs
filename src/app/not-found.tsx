import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="inner-page">
      <div className="page-width">
        <span className="eyebrow"><i /> 404 / PAGE NOT FOUND</span>
        <h1 style={{ maxWidth: 700, margin: "22px 0", fontSize: "clamp(46px, 8vw, 82px)", fontWeight: 450, lineHeight: 1, letterSpacing: "-.07em" }}>This page isn&apos;t<br /><em style={{ color: "#a8a8a3", fontFamily: "Georgia,serif", fontWeight: 400 }}>on the map.</em></h1>
        <p style={{ maxWidth: 470, color: "#999", fontSize: 12, lineHeight: 1.8 }}>The page may have moved, or the address may be incorrect.</p>
        <Link className="button button-outline" href="/#home"><ArrowLeft size={15} /> Return to KnightFX</Link>
      </div>
    </main>
  );
}
