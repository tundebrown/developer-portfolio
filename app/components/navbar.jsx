"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { personalData } from "@/utils/data/personal-data";
import ThemeToggle from "./helper/theme-toggle";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Blog", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    if (!isHome) return;
    const observers = navItems.map(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(href.slice(1)),
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [isHome]);

  // Escape closes the drawer; lock scroll while it's open.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (!isHome) {
      router.push(`/${href}`);
      return;
    }
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  };

  // Scroll to the hash after arriving from another page.
  useEffect(() => {
    if (!isHome || !window.location.hash) return;
    const el = document.getElementById(window.location.hash.slice(1));
    if (!el) return;
    const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    return () => clearTimeout(t);
  }, [isHome]);

  return (
    <>
      <header
        className={`sticky top-0 z-[60] transition-[padding] duration-300 ${
          scrolled ? "pt-2 sm:pt-3" : "pt-3 sm:pt-5"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`glass mx-auto flex h-14 w-[calc(100%-1.5rem)] max-w-[84rem] items-center justify-between gap-3 rounded-2xl px-3 sm:px-5 transition-shadow duration-300`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg text-sm font-bold tracking-tight text-fg"
          >
            <span
              aria-hidden="true"
              className="neu-raised grid h-8 w-8 place-items-center rounded-[10px] font-mono text-[0.7rem] font-semibold text-accent-text"
            >
              TO
            </span>
            <span className="hidden sm:inline">{personalData.name}</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5">
            {navItems.map(({ label, href }) => {
              const isActive = isHome && active === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={isHome ? href : `/${href}`}
                    onClick={(e) => handleNavClick(e, href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block rounded-lg px-3 py-1.5 text-[0.82rem] font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-accent/12 text-accent-text"
                        : "text-fg-muted hover:text-fg hover:bg-fg/5"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <a
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn btn-primary !min-h-9 !px-3.5 !py-1.5 text-[0.8rem]"
            >
              Résumé <HiArrowUpRight size={13} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="lg:hidden neu-button grid h-9 w-9 place-items-center rounded-xl"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-canvas/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          id="mobile-menu"
          className={`glass-strong absolute top-20 left-3 right-3 rounded-2xl p-3 transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          <div className="flex items-center justify-between px-3 pt-1 pb-3">
            <span className="eyebrow">Theme</span>
            <ThemeToggle />
          </div>
          <ul className="flex flex-col gap-0.5 border-t border-line pt-2">
            {navItems.map(({ label, href }) => {
              const isActive = isHome && active === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={isHome ? href : `/${href}`}
                    onClick={(e) => handleNavClick(e, href)}
                    tabIndex={mobileOpen ? 0 : -1}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-[0.95rem] font-medium ${
                      isActive ? "bg-accent/12 text-accent-text" : "text-fg-muted hover:bg-fg/5 hover:text-fg"
                    }`}
                  >
                    {label}
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="grid grid-cols-2 gap-2 border-t border-line mt-2 pt-3">
            <a
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileOpen ? 0 : -1}
              className="btn btn-secondary"
            >
              Résumé
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              tabIndex={mobileOpen ? 0 : -1}
              className="btn btn-primary"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
