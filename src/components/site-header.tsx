"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/about", id: "about" },
  { label: "Mentorship", href: "/mentorship", id: "mentorship" },
  { label: "Partnerships", href: "/partnerships", id: "partners" },
  { label: "Community", href: "/community", id: "community" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const routeItem = navItems.find((item) => item.href === pathname);
    setActive(routeItem?.id ?? "");

    const updateScroll = () => setScrolled(window.scrollY > 18);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActive(current.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell">
        <Link href="/#home" aria-label="KnightFX Trading Labs home" className="brand-lockup" onClick={close}>
          <Image src="/brand/logo.png" alt="KnightFX chess knight emblem" width={62} height={62} priority />
          <span className="brand-wordmark">
            <strong>KNIGHTFX</strong>
            <small>TRADING LABS</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "page" : undefined}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="button button-nav-join" href="https://t.me/knightfxtrader" target="_blank" rel="noopener noreferrer">Join KnightFX <ArrowUpRight size={15} /></Link>
        </div>

        <button
          className="mobile-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="site-mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div id="site-mobile-navigation" className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => { setActive(item.id); close(); }}
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "page" : undefined}
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              <span className="mobile-nav-number">0{index + 1}</span>{item.label}<ArrowUpRight size={16} />
            </Link>
          ))}
          <Link className="button button-nav-join mobile-menu-cta" href="https://t.me/knightfxtrader" target="_blank" rel="noopener noreferrer" onClick={close}>Join KnightFX <ArrowUpRight size={16} /></Link>
        </nav>
        <p>DISCIPLINE <span>•</span> STRATEGY <span>•</span> GROWTH</p>
      </div>
    </header>
  );
}
