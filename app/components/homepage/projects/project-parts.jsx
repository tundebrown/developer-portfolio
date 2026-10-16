"use client";

import { useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { RiGithubLine } from "react-icons/ri";
import Lightbox from "./lightbox";

export function useLightbox(project) {
  const [start, setStart] = useState(null);
  const lightbox =
    start !== null ? (
      <Lightbox
        images={project.images}
        startIndex={start}
        projectName={project.name}
        onClose={() => setStart(null)}
      />
    ) : null;
  return [setStart, lightbox];
}

export function ProjectMeta({ project }) {
  const parts = [project.period, project.status].filter(Boolean);
  if (!parts.length) return null;
  return (
    <p className="flex items-center gap-2 font-mono text-[0.72rem] text-fg-subtle">
      {project.status === "Live" && <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />}
      {parts.join(" · ")}
    </p>
  );
}

export function ToolList({ tools, max }) {
  const shown = max ? tools.slice(0, max) : tools;
  const rest = tools.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {shown.map((t) => (
        <li key={t} className="chip">{t}</li>
      ))}
      {rest > 0 && <li className="chip">+{rest}</li>}
    </ul>
  );
}

// Renders only links that actually exist.
export function ProjectLinks({ project, compact = false }) {
  if (!project.demo && !project.code) return null;
  const size = compact ? "!min-h-9 !px-3.5 !py-1.5 text-[0.8rem]" : "";
  return (
    <div className="flex flex-wrap gap-2.5">
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${size}`}>
          Visit live site <HiArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">(opens {project.name} in a new tab)</span>
        </a>
      )}
      {project.code && (
        <a href={project.code} target="_blank" rel="noopener noreferrer" className={`btn btn-secondary ${size}`}>
          <RiGithubLine size={15} aria-hidden="true" /> Source
        </a>
      )}
    </div>
  );
}
