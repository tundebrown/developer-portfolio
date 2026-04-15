"use client";
// @flow strict
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // track scroll for shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems
      .filter((n) => n.href.startsWith("#"))
      .map((n) => n.href.slice(1));

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // smooth scroll handler
  const handleNavClick = (e, href) => {
    if (!href.startsWith("#")) return; // let Next.js handle /blog etc.
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    setMobileOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-999 backdrop-blur-xl bg-[#060818]/70 border-b border-indigo-500/12 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_30px_rgba(99,102,241,0.08)]" : ""
        }`}
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        {/* Bottom gradient hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

        <div className="max-w-[92rem] mx-auto px-6 sm:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "#")}
            className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
            Tunde Olupitan
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, href }) => {
              const id = href.startsWith("#") ? href.slice(1) : null;
              const isActive = id && active === id;
              return (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`relative px-4 py-2 text-[0.7rem] font-semibold tracking-widest uppercase rounded-md
                      transition-all duration-200 cursor-pointer block
                      ${
                        isActive
                          ? "text-indigo-400 bg-indigo-500/10"
                          : "text-white/45 hover:text-white hover:bg-indigo-500/8"
                      }`}
                  >
                    {label}
                    {/* Active underline dot */}
                    {isActive && (
                      <span
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2
                        w-1 h-1 rounded-full bg-indigo-400
                        shadow-[0_0_6px_#818cf8]"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl
              bg-white/3 border border-indigo-500/20 text-white/60
              hover:bg-indigo-500/10 hover:text-white transition-all duration-200"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#060818]/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-16 left-0 right-0
            bg-[#060818]/95 backdrop-blur-xl
            border-b border-indigo-500/15
            transition-all duration-300 ease-out
            ${mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
        >
          {/* Top hairline */}
          <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          <ul className="flex flex-col px-6 py-4 gap-1">
            {navItems.map(({ label, href }, i) => {
              const id = href.startsWith("#") ? href.slice(1) : null;
              const isActive = id && active === id;
              return (
                <li
                  key={label}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms",
                  }}
                  className={`transition-all duration-300 ${
                    mobileOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-3"
                  }`}
                >
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl
                      text-[0.75rem] font-semibold tracking-widest uppercase
                      transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20"
                          : "text-white/50 hover:text-white hover:bg-indigo-500/8"
                      }`}
                  >
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8]" />
                    )}
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA row */}
          <div className="px-6 pb-5 pt-2 border-t border-white/5">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="flex items-center justify-center w-full py-2.5 rounded-xl
                bg-indigo-600 hover:bg-indigo-500 text-white
                text-[0.7rem] font-bold tracking-widest uppercase
                transition-all duration-200"
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
