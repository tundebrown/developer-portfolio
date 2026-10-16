"use client";

import { usePathname, useRouter } from "next/navigation";
import { TRACK_EVENT } from "../projects/track-event";

// Each chip preselects the matching project filter and scrolls to the projects section.
export default function FocusChips({ areas }) {
  const pathname = usePathname();
  const router = useRouter();

  const select = (e, track) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push(`/?track=${track}#projects`);
      return;
    }
    window.dispatchEvent(new CustomEvent(TRACK_EVENT, { detail: track }));
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Browse projects by focus area">
      {areas.map(({ label, track }) => (
        <li key={track}>
          <a
            href={`/?track=${track}#projects`}
            onClick={(e) => select(e, track)}
            className="chip !px-3 !py-1.5 !text-[0.8rem] transition-colors duration-150 hover:!border-accent hover:!text-accent-text"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
