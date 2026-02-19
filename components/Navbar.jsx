"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Kind Words" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#outreach", label: "Outreach" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    if (typeof document !== "undefined") document.body.classList.remove("nav-open");
  };

  const toggle = () => {
    setOpen((o) => {
      const next = !o;
      if (typeof document !== "undefined") document.body.classList.toggle("nav-open", next);
      return next;
    });
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="#hero" className="logo" onClick={closeMenu}>
          <img
            src="/images/services/header.png"
            alt="Dr. Sahi Psychology & Wellness"
            className="logo-img"
          />
        </Link>
        <button
          type="button"
          className={`nav-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={toggle}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-hidden={!open}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={closeMenu}>
              {label}
            </Link>
          ))}
          <Link href="#contact" className="nav-cta nav-cta-mobile" onClick={closeMenu}>
            Begin a Conversation
          </Link>
        </nav>
        <Link href="#contact" className="nav-cta nav-cta-desk">
          Begin a Conversation
        </Link>
      </div>
    </header>
  );
}
