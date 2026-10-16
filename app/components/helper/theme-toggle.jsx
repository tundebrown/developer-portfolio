"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { HiOutlineComputerDesktop, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const OPTIONS = [
  { value: "light", label: "Light theme", Icon: HiOutlineSun },
  { value: "system", label: "System theme", Icon: HiOutlineComputerDesktop },
  { value: "dark", label: "Dark theme", Icon: HiOutlineMoon },
];

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(preference) {
  const resolved =
    preference === "system" ? (media().matches ? "dark" : "light") : preference;
  const root = document.documentElement;

  // Skip colour transitions for the frame in which the theme flips.
  root.classList.add("theme-switching");
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove("theme-switching")),
  );
}

function readPreference() {
  try {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

const CHANGE_EVENT = "portfolio:theme-change";

// Keeps every toggle instance (navbar and mobile drawer) and other tabs in sync.
function subscribe(callback) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useThemePreference() {
  // The server snapshot is null, so nothing is shown as selected until hydration.
  const preference = useSyncExternalStore(subscribe, readPreference, () => null);

  useEffect(() => {
    if (preference === null) return;
    // Re-apply on load and when another tab changes the theme.
    applyTheme(preference);
    if (preference !== "system") return;
    const mq = media();
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [preference]);

  const choose = useCallback((value) => {
    try {
      if (value === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", value);
    } catch {}
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return [preference, choose];
}

/* Segmented Light / System / Dark control.
   A neumorphic inset track holding raised segments; the selected one is pressed in
   and also gets accent colour, so selection never relies on shadow alone. */
export default function ThemeToggle({ className = "" }) {
  const [preference, choose] = useThemePreference();
  const refs = useRef([]);

  const onKeyDown = (e, index) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + OPTIONS.length) % OPTIONS.length;
    choose(OPTIONS[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={`neu-inset inline-flex items-center gap-1 rounded-full p-1 ${className}`}
    >
      {OPTIONS.map(({ value, label, Icon }, i) => {
        const selected = preference === value;
        return (
          <button
            key={value}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={label}
            tabIndex={selected || (preference === null && value === "system") ? 0 : -1}
            onClick={() => choose(value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`grid h-7 w-7 place-items-center rounded-full border transition-[color,box-shadow,background-color] duration-150
              ${
                selected
                  ? "neu-raised text-accent-text border-line-strong"
                  : "border-transparent text-fg-subtle hover:text-fg"
              }`}
          >
            <Icon size={15} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
