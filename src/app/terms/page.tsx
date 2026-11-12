import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" intro="Terms for using the KnightFX Trading Labs website and educational material." sections={[
    { title: "Educational use", paragraphs: ["This website shares general trading education, learning outlines and market observations. It is not a broker, prop firm, financial institution or investment adviser.", "You are responsible for your own decisions, research and risk management. Nothing on the website is an instruction to buy, sell or hold a financial instrument."] },
    { title: "No outcome is promised", paragraphs: ["Trading involves significant risk and may not be suitable for everyone. Educational frameworks, strategies or examples do not guarantee profit or prevent loss.", "Any examples, demonstrations or historical results should not be treated as a forecast of future performance."] },
    { title: "Third-party services", paragraphs: ["The website may link to external services. Those services have their own terms, conditions and risks. A link or disclosed commercial relationship is not a guarantee or an endorsement of performance."] },
  ]} />;
}
