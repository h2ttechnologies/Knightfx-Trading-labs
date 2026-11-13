"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function FloatingTelegram() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const homeSection = document.getElementById("home");

    // On interior pages there is no home hero to scroll past.
    if (pathname !== "/" || !homeSection) {
      setVisible(true);
      return;
    }

    const updateVisibility = () => {
      setVisible(homeSection.getBoundingClientRect().bottom <= 0);
    };

    updateVisibility();
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });

    observer.observe(homeSection);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <a
      className="floating-telegram"
      href="https://t.me/knightfxtrader"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join KnightFX on Telegram"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      data-visible={visible ? "true" : "false"}
      title="Join KnightFX on Telegram"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="12" fill="#26a5e4" />
        <path
          d="M19.8 6.1 17 18.4c-.2.9-.8 1.1-1.5.6l-4.1-3-2 1.9c-.2.2-.4.4-.8.4l.3-4.2 7.7-7c.3-.3-.1-.5-.5-.2l-9.5 6-4-1.3c-.8-.2-.8-.8.2-1.2L18.7 4.5c.7-.3 1.3.2 1.1 1.6ZM10 13.3l7.2-5.8-5.8 6.6-.2 2.9-1.2-3.7Z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
