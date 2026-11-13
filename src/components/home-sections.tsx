import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import AcidSquares from "@/components/acid-squares";
import { AboutOverview } from "@/components/about-overview";
import { ClearanceInfiniteGallery } from "@/components/clearance-infinite-gallery";
import { LetterReveal } from "@/components/letter-reveal";
import { PartnersDirectory } from "@/components/partners-directory";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/content";
import type { PublicSiteContent } from "@/lib/public-content";

function safeExternalLink(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align === "center" ? "center" : ""}`}>
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-squares-layer" aria-hidden="true">
        <div className="hero-motion-fallback" />
        <AcidSquares
          className="hero-acid-squares"
          color="#080808"
          accentColor="#92928c"
          secondaryColor="#e3e3de"
          tileSize={1}
          gap={0.12}
          roundness={0.25}
          rotation={35}
          waves={1}
          speed={0.9}
          pulse={1}
          lighting="split"
          tilt={0.7}
          grain={0.12}
          intro
          mouseInteraction
          paused={false}
          forceMotion
          detail="low"
          dpr={1.35}
        />
      </div>
      <div className="hero-grain" />
      <div className="hero-content page-width">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="eyebrow-line" /> KNIGHTFX TRADING LABS <span className="hero-edition">EST. FOR THE DISCIPLINED</span></div>
          <h1>Stop chasing<br />the market.<br /><em>Start understanding it.</em></h1>
          <p className="hero-lead">Trading is more than entries and exits. Understand market behaviour, develop a repeatable strategy and build the discipline to follow your plan.</p>
          <div className="hero-actions">
            <Link className="button button-silver" href="#about">Explore KnightFX <ArrowUpRight size={16} /></Link>
            <Link className="button button-quiet" href="#community">Join the community <ArrowRight size={15} /></Link>
          </div>
          <div className="hero-footnote"><span className="footnote-dot" /> MARKET EDUCATION, BUILT AROUND PROCESS.</div>
        </div>

      </div>
      <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      <div className="hero-bottom-rule" />
    </section>
  );
}

function ClearanceShowcase() {
  return (
    <section className="section clearance-section" id="clearances">
      <div className="page-width">
        <div className="clearance-heading">
          <SectionHeading
            eyebrow="TRADER CLEARANCES / COMMUNITY MILESTONES"
            title={<>Proof, <em>not promises.</em></>}
            description="A rotating archive of challenge clearances and payout certificates shared by KnightFX traders."
            align="center"
          />
        </div>
        <ClearanceInfiniteGallery />
        <p className="clearance-disclaimer">These certificates reflect individual milestones, not promises of funding, profit or future trading performance. Trading involves risk.</p>
      </div>
    </section>
  );
}

export function Mentor({ profile = {} }: { profile?: Record<string, string> }) {
  const name = profile.name || "Hareesh";
  const experience = profile.experience || "4+ years";
  const role = profile.role || "Founder & Lead Mentor";
  const introduction = profile.introduction || "Meet Hareesh, the founder of KnightFX Trading Labs. With four years of trading experience, he has developed a strong interest in market behaviour, trading strategies, technical analysis and disciplined execution.";
  const story = profile.story || "KnightFX Trading Labs was created to share trading knowledge, encourage structured learning and help traders develop a better understanding of financial markets.";
  const philosophy = profile.philosophy || "Understand what you trade, respect your risk and remain disciplined throughout the process.";
  return (
    <section className="section mentor-section" id="mentor">
      <div className="page-width mentor-layout">
        <Reveal className="mentor-photo-reveal" blur>
          <div className="mentor-photo-wrap">
            <Image src={profile.portrait_url || "/brand/hareesh.jpg"} alt={`${name}, ${role} of KnightFX Trading Labs`} fill sizes="(max-width: 800px) 100vw, 48vw" unoptimized={Boolean(profile.portrait_url)} className="mentor-photo" />
            <div className="mentor-photo-vignette" />
            <span className="portrait-index">PORTRAIT / 01</span>
            <span className="portrait-mark">K</span>
            <span className="portrait-caption">THE PERSON BEHIND THE PROCESS</span>
          </div>
        </Reveal>
        <Reveal className="mentor-copy" delay={0.12} blur>
          <span className="eyebrow"><i /> THE PERSON BEHIND KNIGHTFX</span>
          <h2 aria-label="Built by a trader. Driven by discipline.">
            <LetterReveal text="Built by a trader." className="mentor-heading-line" />
            <LetterReveal text="Driven by discipline." className="mentor-heading-line mentor-heading-em" />
          </h2>
          <p className="mentor-name">{name.toUpperCase()} <span>{role.toUpperCase()}</span></p>
          <p>{introduction}</p>
          <p>{story}</p>
          <p className="mentor-quote">“{philosophy}”</p>
          <div className="mentor-facts">
            <div><span>01</span><strong>{experience}</strong><small>Trading experience</small></div>
            <div><span>02</span><strong>KnightFX</strong><small>Founder &amp; lead mentor</small></div>
            <div><span>03</span><strong>Discipline</strong><small>A core philosophy</small></div>
          </div>
          <Link className="button button-outline" href="https://t.me/knightfx16" target="_blank" rel="noopener noreferrer">Contact Hareesh <ArrowUpRight size={16} /></Link>
        </Reveal>
      </div>
    </section>
  );
}

export function MentorshipOffer() {
  const inclusions = [
    "Live Interactive Classes",
    "Market Basics & Price Action",
    "Doubt Solving",
    "Prop Firm Suggestions",
    "Trusted Broker Guidance",
    "Payout Roadmap",
    "Risk & Money Management",
  ];

  return (
    <section className="section mentorship-section" id="mentorship">
      <div className="page-width">
        <div className="mentorship-heading">
          <span className="eyebrow"><i /> KNIGHTFX MENTORSHIP</span>
          <div className="mentorship-heading-row">
            <h2>Learn the market.<br /><em>Build your process.</em></h2>
            <p>A live, guided mentorship built to help you understand price action, develop a strategy and manage risk with more intention.</p>
          </div>
        </div>
        <div className="mentorship-offer">
          <div className="mentorship-price-panel">
            <div className="mentorship-price-topline">
              <span className="mentorship-plan-label">15-DAY LIVE MENTORSHIP</span>
              <span className="mentorship-offer-tag">SAVE $200</span>
            </div>
            <div className="mentorship-price-block">
              <span className="mentorship-price-caption">PROGRAM TUITION</span>
              <div className="mentorship-price-line">
                <strong className="mentorship-price">$149</strong>
                <div className="mentorship-compare-price"><del>$349</del><span>ONE-TIME PAYMENT</span></div>
              </div>
              <p>Full access to the complete mentorship program.</p>
            </div>
            <div className="mentorship-gift">
              <span className="mentorship-gift-icon" aria-hidden="true">+</span>
              <span><small>INCLUDED AT NO EXTRA COST</small><strong>3-month Inner Circle access</strong></span>
            </div>
            <span className="mentorship-motto">Learn <i>•</i> Practice <i>•</i> Improve</span>
            <Link
              className="button button-silver mentorship-join"
              href="https://t.me/knightfx16"
              target="_blank"
              rel="noopener noreferrer"
            >
              MESSAGE TO ENROL <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="mentorship-inclusions" id="mentorship-inclusions">
            <span className="mentorship-inclusions-label">YOUR LEARNING PATH</span>
            <h3>Build skills you can carry into every chart.</h3>
            <p className="mentorship-inclusions-intro">Learn the foundations, practice with guidance and develop a more deliberate way to approach the markets.</p>
            <ul>
              {inclusions.map((item) => (
                <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
            <div className="mentorship-card-foot"><span>LIVE LEARNING</span><span>PROCESS FIRST</span><span>RISK AWARE</span></div>
          </div>
        </div>
        <div className="mentorship-contact-banner">
          <div className="mentorship-contact-copy">
            <h3>Not sure yet? <em>Talk to a mentor.</em></h3>
          </div>
          <div className="mentorship-contact-actions">
            <Link className="button button-silver" href="https://t.me/knightfx16" target="_blank" rel="noopener noreferrer">Chat on Telegram <ArrowUpRight size={16} /></Link>
            <Link className="button button-outline" href="#mentorship-inclusions">Explore mentorship</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DestinationLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const safeHref = safeExternalLink(href);
  return safeHref ? <a className={className} href={safeHref} target="_blank" rel="noreferrer">{children}</a> : <span className={`${className} unavailable-link`} aria-disabled="true">{children}<small>Link not connected</small></span>;
}

type CommunityPlatform = "discord" | "telegram" | "whatsapp";

const communityPlatformPaths: Record<CommunityPlatform, string> = {
  discord: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.393-.4065-.8742-.6267-1.2495a.077.077 0 00-.0785-.037A19.7363 19.7363 0 003.669 4.3698a.07.07 0 00-.0321.0275C.5334 9.0462-.32 13.5797.0992 18.0578a.0824.0824 0 00.0312.0561 19.9 19.9 0 006.012 3.0385.078.078 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057 13.131 13.131 0 01-1.872-.8926.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.074.074 0 01.0785.0095c.1202.0991.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.298 12.298 0 01-1.873.8926.077.077 0 00-.0406.1067c.3604.698.7719 1.3627 1.225 1.9932a.076.076 0 00.0842.0286 19.839 19.839 0 006.0214-3.0385.077.077 0 00.0312-.0552c.5-5.1778-.8382-9.6748-3.5495-13.6604a.061.061 0 00-.0312-.0275ZM8.02 14.935c-1.155 0-2.1046-1.0607-2.1046-2.36 0-1.2993.9308-2.3599 2.1046-2.3599 1.183 0 2.123 1.0606 2.123 2.36 0 1.2992-.9308 2.3599-2.123 2.3599Zm7.9748 0c-1.155 0-2.1046-1.0607-2.1046-2.36 0-1.2993.9308-2.3599 2.1046-2.3599 1.183 0 2.123 1.0606 2.123 2.36 0 1.2992-.9308 2.3599-2.123 2.3599Z",
  telegram: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z",
};

function CommunityPlatformIcon({ platform }: { platform: CommunityPlatform }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" aria-hidden="true"><path d={communityPlatformPaths[platform]} /></svg>;
}

export function Community({ links = {} }: { links?: Record<string, string> }) {
  const destinations = {
    ...siteConfig.links,
    ...Object.fromEntries(Object.entries(links).filter(([, value]) => Boolean(value?.trim()))),
  };
  const cards = [
    { number: "01", platform: "discord" as const, title: "Discord community", description: "Connect with traders, join discussions and follow community announcements.", label: "JOIN DISCORD", href: destinations.discord },
    { number: "02", platform: "telegram" as const, title: "Telegram channel", description: "Get KnightFX education, announcements and community updates on Telegram.", label: "JOIN TELEGRAM", href: destinations.telegram },
    { number: "03", platform: "whatsapp" as const, title: "WhatsApp group", description: "Join the KnightFX group to stay connected with the wider trading community.", label: "JOIN WHATSAPP", href: destinations.whatsapp },
  ];
  return (
    <section className="section community-section" id="community">
      <div className="page-width">
        <div className="community-topline">
          <span className="eyebrow community-section-label"><i />05 / KNIGHTFX COMMUNITY</span>
          <div className="community-brand-lockup">
            <Image src="/brand/logo.png" alt="" width={34} height={34} />
            <span><strong>KNIGHTFX</strong><small>TRADING LABS</small></span>
          </div>
        </div>
        <div className="community-intro">
          <div className="community-intro-copy">
            <h2>TRADE TOGETHER.<br /><em>GROW TOGETHER.</em></h2>
            <p>A growing community of traders focused on learning, market discussion, discipline and continuous improvement.</p>
          </div>
          <div className="community-stat" aria-label="More than 200 active traders">
            <strong>200<span>+</span></strong>
            <small>ACTIVE TRADERS</small>
          </div>
        </div>
        <div className="community-grid">
          {cards.map((card, index) => {
            return (
              <Reveal key={card.number} delay={index * 0.06}>
                <article className="community-card" data-platform={card.platform}>
                  <div className="community-card-top"><span>{card.number} / COMMUNITY</span><span className="community-platform-mark"><CommunityPlatformIcon platform={card.platform} /></span></div>
                  <h3>{card.title}</h3><p>{card.description}</p>
                  <DestinationLink href={card.href} className="community-link">{card.label}<ArrowUpRight size={15} /></DestinationLink>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeSections({ content }: { content?: PublicSiteContent | null }) {
  const communityLinks = content?.links ?? {};
  return (
    <>
      <Hero />
      <AboutOverview />
      <Mentor profile={content?.mentor} />
      <ClearanceShowcase />
      <MentorshipOffer />
      <PartnersDirectory items={content?.partners ?? []} />
      <Community links={communityLinks} />
    </>
  );
}
