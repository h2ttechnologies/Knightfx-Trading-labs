import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  MessageCircle,
  Send,
  UsersRound,
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

export function Community({ links = {} }: { links?: Record<string, string> }) {
  const destinations = {
    ...siteConfig.links,
    ...Object.fromEntries(Object.entries(links).filter(([, value]) => Boolean(value?.trim()))),
  };
  const cards = [
    { number: "01", title: "Discord community", description: "Connect with traders, join discussions and follow community announcements.", label: "JOIN DISCORD", href: destinations.discord, icon: MessageCircle },
    { number: "02", title: "Telegram channel", description: "Get KnightFX education, announcements and community updates on Telegram.", label: "JOIN TELEGRAM", href: destinations.telegram, icon: Send },
    { number: "03", title: "WhatsApp group", description: "Join the KnightFX group to stay connected with the wider trading community.", label: "JOIN WHATSAPP", href: destinations.whatsapp, icon: UsersRound },
  ];
  return (
    <section className="section community-section" id="community">
      <div className="page-width">
        <div className="community-topline"><span>GROW TOGETHER</span><span>COMMUNITY / 01—03</span></div>
        <div className="community-heading-row"><h2>Trading is a journey.<br /><em>You don&apos;t have to take it alone.</em></h2><p>Connect with traders, exchange ideas, explore educational content and grow through shared experience.</p></div>
        <div className="community-grid">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.number} delay={index * 0.06}>
                <article className="community-card">
                  <div className="community-card-top"><span>{card.number} / COMMUNITY</span><Icon size={20} /></div>
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
