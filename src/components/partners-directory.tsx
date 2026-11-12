"use client";

import Image from "next/image";
import { ArrowUpRight, RotateCcw, RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PublicSiteContent } from "@/lib/public-content";

type ProviderCategory = "prop_firm" | "broker";
type PartnerCard = { id: string; name: string; category: ProviderCategory; href: string; logo?: string };

const firmLinks = [
  { name: "Foraxis", category: "prop_firm", href: "https://dashboard.foraxis.com/new-challenge?market=forex&step=2&size=100000&group=CORE&program=6a907856eb7a9df782c3dcb0&platform=MT5&coupon=KNIGHTFX" },
  { name: "FunderBlu", category: "prop_firm", href: "https://www.funderblu.com/checkout?add-to-cart=6" },
  { name: "VestMarkets", category: "prop_firm", href: "https://next.vestmarkets.com/checkout" },
  { name: "FundedSquad", category: "prop_firm", href: "https://checkout.fundedsquad.com/checkout/?add-to-cart=30900&variation_id=32619&coupon=KNIGHTFX&quantity=1&attribute_account-size=100K&attribute_trading-platform=MetaTrader+5&_gl=1*myzbgc*_gcl_aw*R0NMLjE3OTExNDIzMDkuQ2owS0NRanc4b2ZXQmhDSEFSSXNBTkJqNEx1ZmxPcGdQcWJfMlllREZsTjFjRWJnYnpmX2xXWS16Nm82TXo2WjZfX2RDcXkwRjF1NlVoVWFBcDBxRUFMd193Y0I.*_gcl_au*NTI5OTkyMjQ4LjE3OTExNDIyODQuNTYwMzcwNDU2LjE3OTQ0NTY2MjUuMTc5NDQ1NjYyNi4xODAxMDgxMzguMTc5NDQ1NjYyNS4xNzk0NDU2NjI2*FPAU*NTI5OTkyMjQ4LjE3OTExNDIyODQ." },
  { name: "Legion Funding", category: "prop_firm", href: "https://legionfunding.com/" },
  { name: "Blue Guardian", category: "prop_firm", href: "https://checkout.blueguardian.com/" },
  { name: "XM Global", category: "broker", href: "https://affs.click/DneRX" },
  { name: "Valetax", category: "broker", href: "https://ma.valetax.com/p/6882272" },
] as const;

const partnerLogos: Record<string, string> = {
  foraxis: "/partners/foraxis.png",
  funderblu: "/partners/funderblu.png",
  fundedsquad: "/partners/fundedsquad.png",
  legionfunding: "/partners/legion-funding.png",
  blueguardian: "/partners/blueguardian.png",
  xmglobal: "/partners/xm-global.png",
  valetax: "/partners/valetax.png",
};

const safeExternalLink = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
};

const normalizeFirmName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

function PartnerCardFace({ partner, index, isFirmView }: { partner: PartnerCard; index: number; isFirmView: boolean }) {
  return (
    <>
      <div className="partner-card-topline"><span>{String(index + 1).padStart(2, "0")} / {isFirmView ? "FIRM" : "BROKER"}</span>{isFirmView ? <ArrowUpRight size={16} aria-hidden="true" /> : <RotateCw size={16} aria-hidden="true" />}</div>
      <div className="partner-logo-stage">
        {partner.logo ? (
          <Image src={partner.logo} alt="" fill sizes="(max-width: 680px) 90vw, (max-width: 1100px) 42vw, 38vw" className="partner-logo-image" />
        ) : (
          <span className="partner-wordmark-fallback">VEST<span>MARKETS</span></span>
        )}
      </div>
      <div className="partner-card-footer"><strong>{partner.name}</strong><span>{isFirmView ? "Explore firm" : "Tap to reveal"} {isFirmView ? <ArrowUpRight size={13} aria-hidden="true" /> : <RotateCw size={13} aria-hidden="true" />}</span></div>
    </>
  );
}

function BrokerFlipCard({ partner, index, href }: { partner: PartnerCard; index: number; href: string }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipButtonRef = useRef<HTMLButtonElement>(null);
  const visitLinkRef = useRef<HTMLAnchorElement>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (!hasInteractedRef.current) return;
    const nextFocus = isFlipped ? visitLinkRef.current : flipButtonRef.current;
    nextFocus?.focus({ preventScroll: true });
  }, [isFlipped]);

  return (
    <div className={`partner-panel partner-flip-card${isFlipped ? " is-flipped" : ""}`} data-partner={normalizeFirmName(partner.name)} style={{ animationDelay: `${index * 45}ms` }}>
      <div className="partner-flip-inner">
        <button ref={flipButtonRef} className="partner-flip-face partner-flip-front" type="button" aria-label={`Show ${partner.name} details`} aria-expanded={isFlipped} tabIndex={isFlipped ? -1 : 0} aria-hidden={isFlipped} onClick={() => { hasInteractedRef.current = true; setIsFlipped(true); }}>
          <PartnerCardFace partner={partner} index={index} isFirmView={false} />
        </button>
        <div className="partner-flip-face partner-back-face" aria-hidden={!isFlipped}>
          <span className="partner-back-eyebrow">BROKER / {String(index + 1).padStart(2, "0")}</span>
          <h3>{partner.name}</h3>
          <p>Continue to the broker’s website to view its services and account options.</p>
          <div className="partner-back-actions">
            <a ref={visitLinkRef} className="partner-visit-link" href={href} target="_blank" rel="sponsored noopener noreferrer" tabIndex={isFlipped ? 0 : -1}>Visit {partner.name} <ArrowUpRight size={15} aria-hidden="true" /></a>
            <button className="partner-flip-back-button" type="button" tabIndex={isFlipped ? 0 : -1} onClick={() => { hasInteractedRef.current = true; setIsFlipped(false); }}><RotateCcw size={13} aria-hidden="true" /> Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PartnersDirectory({ items }: { items: NonNullable<PublicSiteContent>["partners"] }) {
  const [category, setCategory] = useState<ProviderCategory>("prop_firm");

  const partners: PartnerCard[] = firmLinks.map((firm) => {
    const configured = items.find((partner) => normalizeFirmName(partner.name) === normalizeFirmName(firm.name));
    return {
      ...configured,
      id: configured?.id ?? firm.name.toLowerCase().replaceAll(" ", "-"),
      name: configured?.name ?? firm.name,
      category: firm.category as ProviderCategory,
      href: firm.href,
      logo: partnerLogos[normalizeFirmName(firm.name)],
    };
  });
  const visiblePartners = partners.filter((partner) => partner.category === category);
  const isFirmView = category === "prop_firm";

  return (
    <section className="section partners-section" id="partners">
      <div className="page-width partner-section-content">
        <div className="partner-section-heading">
          <span className="eyebrow"><i /> KNIGHTFX PARTNERS</span>
          <h2>Find your <em>trading partner.</em></h2>
        </div>
        <div className="partner-directory-toolbar">
          <div className="partner-filter-tabs" role="group" aria-label="Filter providers">
            <button type="button" aria-pressed={isFirmView} className={isFirmView ? "is-active" : ""} onClick={() => setCategory("prop_firm")}>
              Firms
            </button>
            <button type="button" aria-pressed={!isFirmView} className={!isFirmView ? "is-active" : ""} onClick={() => setCategory("broker")}>
              Brokers
            </button>
          </div>
          <span className="partner-count">{isFirmView ? "06 FIRMS" : "02 BROKERS"}</span>
        </div>

        <div className={`partner-grid ${isFirmView ? "is-firms" : "is-brokers"}`} aria-live="polite" aria-label={isFirmView ? "Prop firms" : "Brokers"} key={category}>
          {visiblePartners.map((partner, index) => {
            const href = safeExternalLink(partner.href);

            if (!isFirmView) {
              return <BrokerFlipCard key={partner.id} partner={partner} index={index} href={href} />;
            }

            return (
              <a className="partner-panel" key={partner.id} data-partner={normalizeFirmName(partner.name)} href={href} target="_blank" rel="sponsored noopener noreferrer" style={{ animationDelay: `${index * 45}ms` }}>
                <PartnerCardFace partner={partner} index={index} isFirmView />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
