import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy" intro="How information submitted through KnightFX Trading Labs may be handled." sections={[
    { title: "Information you provide", paragraphs: ["The public website does not currently provide a contact form. If you contact KnightFX through Telegram, that service processes your information under its own privacy policy.", "Do not share account passwords, payment details or other sensitive information in public channels."] },
    { title: "How information is used", paragraphs: ["Information shared directly with KnightFX is used to respond to your message and should not be used for unrelated marketing without an appropriate basis and notice.", "This website does not include advertising analytics or a newsletter signup. If those services are added, this notice should be updated before enabling them."] },
    { title: "Storage and requests", paragraphs: ["Telegram messages are handled and stored by Telegram according to its policies. For a privacy request about information held by KnightFX, contact the team through the official Telegram account."] },
  ]} />;
}
