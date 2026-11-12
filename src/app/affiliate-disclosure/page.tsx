import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Affiliate Disclosure" };

export default function AffiliateDisclosurePage() {
  return <LegalPage title="Affiliate Disclosure" intro="Some links on this website may be commercial or affiliate links." sections={[
    { title: "How links may work", paragraphs: ["KnightFX Trading Labs may receive compensation when a visitor registers with or purchases from a third party through an affiliate link. Any applicable relationship should be disclosed next to the relevant link."] },
    { title: "No performance guarantee", paragraphs: ["A commercial relationship does not guarantee trading performance, funding, a payout or a particular outcome. Consider a provider's terms, fees and risks independently before making a decision."] },
    { title: "Editorial independence", paragraphs: ["Affiliate compensation does not turn educational content into financial advice. Partner details and discount codes will only be published after they have been verified."] },
  ]} />;
}
