import Image from "next/image";

type ClearanceImage = {
  src: string;
  alt: string;
  shape: "landscape" | "square" | "portrait";
};

const clearanceImages: ClearanceImage[] = [
  { src: "/clearances/clearance-lucid-may.png", alt: "Lucid Trading funded account clearance, May", shape: "landscape" },
  { src: "/clearances/clearance-lucid-july.png", alt: "Lucid Trading funded account clearance, July", shape: "landscape" },
  { src: "/clearances/clearance-legion-funding.png", alt: "Legion Funding evaluation clearance", shape: "landscape" },
  { src: "/clearances/clearance-funderblu.jpg", alt: "FunderBlu certificate of achievement", shape: "landscape" },
  { src: "/clearances/clearance-fundedverse-phase-01.png", alt: "FundedVerse phase one passed", shape: "landscape" },
  { src: "/clearances/clearance-fundedverse-evaluation.png", alt: "FundedVerse evaluation passed", shape: "landscape" },
  { src: "/clearances/clearance-fundedhive-phase-02.jpg", alt: "FundedHive phase two passed", shape: "square" },
  { src: "/clearances/clearance-fundedhive-phase-01.png", alt: "FundedHive phase one passed", shape: "square" },
  { src: "/clearances/clearance-funded-trader-markets.png", alt: "Funded Trader Markets phase one passed", shape: "portrait" },
  { src: "/clearances/clearance-challenge-completed.png", alt: "Trading challenge completed certificate", shape: "square" },
  { src: "/clearances/clearance-blueguardian.png", alt: "Blue Guardian funded certificate", shape: "landscape" },
];

const payoutImages: ClearanceImage[] = [
  { src: "/payouts/payout-01.png", alt: "Blue Guardian payout certificate", shape: "landscape" },
  { src: "/payouts/payout-02.png", alt: "Sure Leverage Funding payout certificate", shape: "landscape" },
  { src: "/payouts/payout-03.png", alt: "FundedSquad payout certificate", shape: "landscape" },
  { src: "/payouts/payout-04.png", alt: "FundedSquad performance payout certificate", shape: "landscape" },
  { src: "/payouts/payout-05.png", alt: "FundingPips performance reward payout certificate", shape: "portrait" },
];

function ClearanceRow({
  images,
  direction,
  duration,
  label,
}: {
  images: ClearanceImage[];
  direction: "left" | "right";
  duration: number;
  label: string;
}) {
  return (
    <div className="clearance-marquee" role="group" aria-label={label}>
      <div className={`clearance-track clearance-track-${direction}`} style={{ animationDuration: `${duration}s` }}>
        {[0, 1].map((copy) => (
          <div className="clearance-group" key={copy} aria-hidden={copy === 1}>
            {images.map((image) => (
              <figure className={`clearance-card clearance-card-${image.shape}`} key={image.src}>
                <Image
                  src={image.src}
                  alt={copy === 0 ? image.alt : ""}
                  fill
                  sizes="(max-width: 680px) 76vw, (max-width: 960px) 42vw, 30vw"
                  unoptimized
                  draggable={false}
                  className="clearance-card-image"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClearanceInfiniteGallery() {
  return (
    <div className="clearance-gallery" role="group" aria-label="Community clearance certificates">
      <ClearanceRow images={clearanceImages} direction="left" duration={108} label="Challenge clearance certificates moving left" />
      <ClearanceRow images={payoutImages} direction="right" duration={58} label="Payout certificates moving right" />
    </div>
  );
}
