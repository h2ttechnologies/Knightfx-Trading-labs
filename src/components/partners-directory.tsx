"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AffiliateCodeButton } from "@/components/affiliate-code";
import { LetterReveal } from "@/components/letter-reveal";
import { Reveal } from "@/components/reveal";
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
  foraxis: "/partners/foraxis.jpg",
  funderblu: "/partners/funderblu.jpg",
  vestmarkets: "/partners/vestmarkets.jpg",
  fundedsquad: "/partners/fundedsquad.jpg",
  legionfunding: "/partners/legion-funding.jpg",
  blueguardian: "/partners/blueguardian.jpg",
  xmglobal: "/partners/xm-global.jpg",
  valetax: "/partners/valetax.jpg",
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
      <div className="partner-card-topline">
        <span className="partner-card-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="partner-logo-stage">
        {partner.logo ? (
          <Image src={partner.logo} alt="" fill sizes="(max-width: 680px) 90vw, 46vw" className="partner-logo-image" />
        ) : (
          <span className="partner-wordmark-fallback">VEST<span>MARKETS</span></span>
        )}
      </div>
      <div className="partner-card-footer">
        <strong>{partner.name}</strong>
        <span>{isFirmView ? <ArrowUpRight size={15} aria-hidden="true" /> : <RotateCw size={15} aria-hidden="true" />}</span>
      </div>
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
        <button ref={flipButtonRef} className="partner-flip-face partner-flip-front" type="button" aria-label={`Show ${partner.name} offer`} aria-expanded={isFlipped} tabIndex={isFlipped ? -1 : 0} aria-hidden={isFlipped} onClick={() => { hasInteractedRef.current = true; setIsFlipped(true); }}>
          <PartnerCardFace partner={partner} index={index} isFirmView={false} />
        </button>
        <div className="partner-flip-face partner-back-face" aria-hidden={!isFlipped}>
          <span className="partner-back-eyebrow">BROKER / {String(index + 1).padStart(2, "0")}</span>
          <h3>{partner.name}</h3>
          <p>Deposit through {partner.name} to get a bonus and free access to the KnightFX Inner Circle.</p>
          <div className="partner-back-actions">
            <a ref={visitLinkRef} className="partner-visit-link" href={href} target="_blank" rel="sponsored noopener noreferrer" tabIndex={isFlipped ? 0 : -1}>Visit {partner.name} <ArrowUpRight size={15} aria-hidden="true" /></a>
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
    <>
    <section className="section partners-section" id="partners">
      <div className="page-width partner-section-content">
        <div className="partner-section-heading">
          <div className="partner-heading-main">
            <span className="eyebrow"><i /> KNIGHTFX / PARTNER NETWORK</span>
            <h2>Find your <em>trading partner.</em></h2>
          </div>
          <div className="partner-heading-aside">
            <p>Explore prop firms and brokers connected with KnightFX. Review each provider’s latest terms directly before you decide.</p>
            <div className="partner-network-index"><strong>08</strong><span><i />NETWORK LINKS</span></div>
          </div>
        </div>
        <div className="partner-directory-toolbar">
          <div className="partner-filter-tabs" role="group" aria-label="Filter providers">
            <button type="button" aria-pressed={isFirmView} className={isFirmView ? "is-active" : ""} onClick={() => setCategory("prop_firm")}>
              <span>Prop firms</span><small>06</small>
            </button>
            <button type="button" aria-pressed={!isFirmView} className={!isFirmView ? "is-active" : ""} onClick={() => setCategory("broker")}>
              <span>Brokers</span><small>02</small>
            </button>
          </div>
          <span className="partner-count"><i /> SHOWING {isFirmView ? "PROP FIRM PARTNERS" : "BROKER PARTNERS"}</span>
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
    <section className="partner-offer-section" aria-labelledby="partner-offer-title">
      <div className="page-width partner-offer-layout">
        <Reveal className="partner-offer-copy" blur>
          <span className="eyebrow"><i /> KNIGHTFX COMMUNITY</span>
          <h2 id="partner-offer-title" aria-label="Use the code. Access the offer.">
            <span className="partner-offer-heading-line"><LetterReveal text="USE THE CODE." /></span>
            <span className="partner-offer-heading-line partner-offer-heading-muted"><LetterReveal text="ACCESS THE OFFER." /></span>
          </h2>
          <p>Explore the KnightFX partner network and use our community code wherever it is available.</p>
          <div className="partner-offer-actions">
            <a className="button button-outline" href="#partners">Explore partners <ArrowRight size={15} aria-hidden="true" /></a>
            <div className="partner-offer-code">
              <span>COMMUNITY CODE</span>
              <AffiliateCodeButton code="KNIGHTFX" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
    </>
  );
}
