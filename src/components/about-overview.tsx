import { Reveal } from "@/components/reveal";

export function AboutOverview() {
  return (
    <section className="section about-intro-section" id="about">
      <div className="page-width">
        <Reveal className="section-heading about-intro-copy" blur>
          <span className="eyebrow"><i />ABOUT / KNIGHTFX TRADING LABS</span>
          <h2>KNIGHTFX<br /><em>TRADING LABS</em></h2>
          <p><strong>KNIGHTFX TRADING LABS began in July 2026 with a mission to help traders become more knowledgeable, disciplined and consistent in the financial markets.</strong></p>
          <p>Our focus is trading education, market understanding, mentorship and building a community of traders.</p>
        </Reveal>
        <div className="about-intro-details" aria-label="About KnightFX Trading Labs">
          <Reveal className="about-intro-detail-reveal" blur delay={0.08}>
            <article>
              <span>01 / OUR MISSION</span>
              <h3>Build understanding.</h3>
              <p>Make market education more accessible and help traders build knowledge for thoughtful decisions.</p>
            </article>
          </Reveal>
          <Reveal className="about-intro-detail-reveal" blur delay={0.18}>
            <article>
              <span>02 / OUR LEARNING</span>
              <h3>Learn with structure.</h3>
              <p>Explore market basics, price action, strategy development and risk management through guided learning.</p>
            </article>
          </Reveal>
          <Reveal className="about-intro-detail-reveal" blur delay={0.28}>
            <article>
              <span>03 / OUR COMMUNITY</span>
              <h3>Grow together.</h3>
              <p>Connect with traders, exchange ideas and keep learning alongside the KnightFX community.</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
