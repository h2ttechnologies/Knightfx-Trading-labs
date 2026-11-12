"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import { resultCategories } from "@/lib/content";

export type ResultItem = {
  image: string;
  title: string;
  description: string;
  date: string;
  category: string;
  verification?: string;
  featured?: boolean;
};

export function ResultsGallery({ items = [] }: { items?: ResultItem[] }) {
  const [category, setCategory] = useState(resultCategories[0]);
  const [selected, setSelected] = useState<number | null>(null);
  const visible = items.filter((item) => category === "All milestones" || item.category === category).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((index) => index === null ? null : (index + 1) % visible.length);
      if (event.key === "ArrowLeft") setSelected((index) => index === null ? null : (index - 1 + visible.length) % visible.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [selected, visible.length]);

  return (
    <>
      <div className="gallery-toolbar">
        <div className="filter-list" role="group" aria-label="Filter milestones">
          {resultCategories.map((item) => (
            <button key={item} className={category === item ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(item)} type="button">{item}</button>
          ))}
        </div>
        <span className="gallery-count">{visible.length.toString().padStart(2, "0")} verified items</span>
      </div>
      {visible.length === 0 ? (
        <div className="evidence-empty">
          <div className="empty-emblem"><span>♞</span></div>
          <div>
            <span className="eyebrow">EVIDENCE ARCHIVE <i>·</i> NOT YET PUBLISHED</span>
            <h3>Proof before promises.</h3>
            <p>Verified payout evidence, certificates and trader milestones will appear here after review. No results or performance claims are being presented yet.</p>
          </div>
          <span className="empty-index">00 / 00</span>
        </div>
      ) : (
        <div className="results-grid">
          {visible.map((item, index) => (
            <button key={`${item.title}-${item.date}`} type="button" className="result-card" onClick={() => setSelected(index)}>
              <span className="result-card-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 720px) 100vw, 33vw" unoptimized /></span>
              <span className="result-card-meta">{item.category}<span>{item.date}</span></span>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>
      )}
      {selected !== null && visible[selected] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={visible[selected].title} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image viewer"><X /></button>
          <button className="lightbox-arrow previous" onClick={() => setSelected((selected - 1 + visible.length) % visible.length)} aria-label="Previous item"><ArrowLeft /></button>
          <div className="lightbox-content">
            <div className="lightbox-image"><Image src={visible[selected].image} alt={visible[selected].title} fill sizes="90vw" unoptimized /></div>
            <div className="lightbox-caption"><span>{visible[selected].category} · {visible[selected].date}</span><h2>{visible[selected].title}</h2><p>{visible[selected].description}</p>{visible[selected].verification && <a href={visible[selected].verification} target="_blank" rel="noreferrer">View verification <ExternalLink size={14} /></a>}</div>
          </div>
          <button className="lightbox-arrow next" onClick={() => setSelected((selected + 1) % visible.length)} aria-label="Next item"><ArrowRight /></button>
        </div>
      )}
    </>
  );
}
