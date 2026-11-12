"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

type CertificateCard = {
  src: string;
  alt: string;
  shape: "landscape" | "wide" | "portrait";
  left?: string;
  right?: string;
  top: string;
  rotation: number;
};

const certificates: CertificateCard[] = [
  { src: "/payouts/payout-01.png", alt: "Blue Guardian payout certificate", shape: "landscape", left: "1%", top: "8%", rotation: -8 },
  { src: "/payouts/payout-02.png", alt: "Sure Leverage Funding payout certificate", shape: "wide", left: "14%", top: "36%", rotation: 6 },
  { src: "/payouts/payout-03.png", alt: "FundedSquad performance certificate", shape: "landscape", left: "2%", top: "65%", rotation: -4 },
  { src: "/payouts/payout-04.png", alt: "FundedSquad performance certificate", shape: "landscape", right: "2%", top: "12%", rotation: 7 },
  { src: "/payouts/payout-05.png", alt: "FundingPips performance reward certificate", shape: "portrait", right: "15%", top: "53%", rotation: -6 },
];

export function PayoutDragCards() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [frontCard, setFrontCard] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="payout-cards-stage" ref={stageRef} aria-label="Draggable payout certificates">
      {certificates.map((certificate, index) => (
        <motion.div
          key={certificate.src}
          className={`payout-card-position payout-card-position-${index + 1} payout-card-${certificate.shape}`}
          style={{ left: certificate.left, right: certificate.right, top: certificate.top, zIndex: frontCard === index ? 20 : index + 1 }}
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.95, rotate: certificate.rotation - 4 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: certificate.rotation }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.figure
            className="payout-drag-card"
            drag
            dragConstraints={stageRef}
            dragElastic={0.08}
            dragMomentum={false}
            whileTap={{ scale: 0.985 }}
            onDragStart={() => setFrontCard(index)}
            onPointerDown={() => setFrontCard(index)}
            aria-label={`Drag to explore: ${certificate.alt}`}
          >
            <Image
              src={certificate.src}
              alt={certificate.alt}
              fill
              sizes="(max-width: 680px) 44vw, (max-width: 960px) 26vw, 22vw"
              unoptimized
              draggable={false}
              className="payout-drag-card-image"
            />
          </motion.figure>
        </motion.div>
      ))}
    </div>
  );
}
