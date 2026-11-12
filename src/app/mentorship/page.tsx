import type { Metadata } from "next";
import { MentorshipOffer } from "@/components/home-sections";

export const metadata: Metadata = {
  title: "Mentorship",
  description: "Explore the KnightFX 15-Day Live Mentorship and its structured trading education program.",
};

export default function MentorshipPage() {
  return (
    <main id="main-content" className="home-page">
      <MentorshipOffer />
    </main>
  );
}
