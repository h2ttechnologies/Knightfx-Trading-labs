import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/content";
import { CopyrightNotice } from "@/components/copyright-notice";

function externalHref(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function FooterLink({ label, href }: { label: string; href: string }) {
  if (!href) return <span className="footer-link-unavailable">{label}<small>Coming soon</small></span>;
  if (href.startsWith("/")) return <Link href={href}>{label}<ArrowUpRight size={12} /></Link>;
  const safeHref = externalHref(href);
  if (!safeHref) return <span className="footer-link-unavailable">{label}<small>Link not connected</small></span>;
  return <a href={safeHref} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={12} /></a>;
}

export function SiteFooter({ links = {} }: { links?: Record<string, string> }) {
  const communityLinks = {
    ...siteConfig.links,
    ...Object.fromEntries(Object.entries(links).filter(([, value]) => Boolean(value?.trim()))),
  };
  const linkColumns = [
    { title: "Explore", links: [["Home", "/"], ["About", "/about"], ["Mentorship", "/mentorship"], ["Partnerships", "/partnerships"], ["Community", "/community"], ["Academy", "/academy"], ["Market room", "/market-room"]] },
    { title: "Community", links: [["Discord", communityLinks.discord], ["Telegram", communityLinks.telegram], ["WhatsApp", communityLinks.whatsapp]] },
    { title: "Partners", links: [["Prop firms", "/#partners"], ["Brokers", "/#partners"], ["Affiliate disclosure", "/affiliate-disclosure"]] },
    { title: "Mentorship", links: [["Contact for mentorship", "https://t.me/knightfx16"]] },
  ];
  return (
    <footer className="site-footer">
      <div className="footer-main page-width">
        <div className="footer-brand">
          <Link href="/#home" className="footer-logo">
            <Image src="/brand/logo.png" alt="KnightFX Trading Labs logo" width={96} height={96} />
            <span><strong>KNIGHTFX</strong><small>TRADING LABS</small></span>
          </Link>
          <p>A trading education brand focused on market understanding, strategic development, risk management and disciplined trading.</p>
          <span className="footer-motto">DISCIPLINE <i>•</i> STRATEGY <i>•</i> GROWTH</span>
        </div>
        <div className="footer-links-grid">
          {linkColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(([label, href]) => <FooterLink key={label} label={label} href={href} />)}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-disclaimers page-width">
        <div>
          <span>RISK DISCLOSURE</span>
          <p>Trading financial instruments involves significant risk and may not be suitable for every individual. Content is for educational and informational purposes only, not financial or investment advice. Past performance does not guarantee future results.</p>
        </div>
        <div>
          <span>AFFILIATE DISCLOSURE</span>
          <p>Some links may be affiliate links. KnightFX Trading Labs may receive compensation when users register or purchase through them. Partner relationships do not guarantee trading performance.</p>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <CopyrightNotice />
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/risk-disclosure">Disclaimer</Link>
          <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
        </div>
        <a className="back-to-top" href="#home" aria-label="Back to top">↑</a>
      </div>
    </footer>
  );
}
