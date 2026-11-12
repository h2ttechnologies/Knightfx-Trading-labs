import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Risk Disclosure" };

export default function RiskDisclosurePage() {
  return <LegalPage title="Risk Disclosure" intro="Trading and leveraged financial products carry substantial risk." sections={[
    { title: "Market risk", paragraphs: ["Trading financial instruments involves significant risk and may not be suitable for every individual. Prices can move quickly, and leverage can magnify losses as well as gains.", "You may lose some or all of the capital committed to trading. Only make decisions after considering your financial circumstances and risk tolerance."] },
    { title: "Educational content", paragraphs: ["KnightFX Trading Labs content is for informational and educational purposes only and should not be considered financial, investment, legal or tax advice.", "Past performance does not guarantee future results. No content on this website promises a particular return, payout, funding outcome or student result."] },
    { title: "Independent decisions", paragraphs: ["You are responsible for independent research and decisions. Consider seeking advice from an appropriately qualified professional if you need guidance for your circumstances."] },
  ]} />;
}
