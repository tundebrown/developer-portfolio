"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import FeaturedProject from "./featured-project";
import ProjectCard from "./project-card";
import { TRACK_EVENT } from "./track-event";

const readTrack = (tracks) => {
  const t = new URLSearchParams(window.location.search).get("track");
  return tracks.some((x) => x.id === t) ? t : "all";
};

/* Filterable project list. "All work" is the default and needs no interaction.
   The selected track is mirrored to ?track= so filtered views can be shared. */
export default function ProjectsShowcase({ projects, tracks, standardLimit, showAllLink = false }) {
  const [track, setTrack] = useState("all");

  useEffect(() => {
    setTrack(readTrack(tracks));
    const onTrack = (e) => select(e.detail);
    window.addEventListener(TRACK_EVENT, onTrack);
    return () => window.removeEventListener(TRACK_EVENT, onTrack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (id) => {
    setTrack(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("track");
    else url.searchParams.set("track", id);
    history.replaceState(null, "", url);
  };

  const counts = useMemo(
    () =>
      Object.fromEntries(
        tracks.map(({ id }) => [id, id === "all" ? projects.length : projects.filter((p) => p.tracks.includes(id)).length]),
      ),
    [projects, tracks],
  );

  const visible = track === "all" ? projects : projects.filter((p) => p.tracks.includes(track));
  const featured = visible.filter((p) => p.tier === "featured");
  const standardAll = visible.filter((p) => p.tier === "standard");
  const standard = standardLimit ? standardAll.slice(0, standardLimit) : standardAll;
  const compact = visible.filter((p) => p.tier === "compact");
  const hidden = standardAll.length - standard.length;

  return (
    <div className="flex flex-col gap-10">
      <div role="group" aria-label="Filter projects by focus" className="flex flex-wrap gap-2">
        {tracks
          .filter(({ id }) => counts[id] > 0)
          .map(({ id, label }) => {
            const selected = track === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => select(id)}
                className={`neu-button inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium ${
                  selected ? "!text-accent-text !border-accent/50" : ""
                }`}
              >
                {label}
                <span className="font-mono text-[0.7rem] text-fg-subtle">{counts[id]}</span>
              </button>
            );
          })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      {featured.length > 0 && (
        <div className="flex flex-col gap-8">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} reverse={i % 2 === 1} priority={i === 0} />
          ))}
        </div>
      )}

      {standard.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {standard.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}

      {compact.length > 0 && (
        <section aria-labelledby="also-shipped" className="surface-card p-5 sm:p-6">
          <h3 id="also-shipped" className="eyebrow mb-4">Also shipped</h3>
          <ul className="divide-y divide-line">
            {compact.map((p) => (
              <li key={p.slug} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="flex max-w-3xl flex-col gap-1">
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-bold text-fg">{p.name}</span>
                    <span className="font-mono text-[0.72rem] text-fg-subtle">
                      {[p.period, p.role].filter(Boolean).join(" · ")}
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed text-fg-muted">{p.summary}</p>
                </div>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent-text hover:underline"
                  >
                    Visit <HiArrowUpRight size={13} aria-hidden="true" />
                    <span className="sr-only">{p.name}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {showAllLink && (
        <div className="flex justify-center">
          <Link href={track === "all" ? "/project" : `/project?track=${track}`} className="btn btn-secondary">
            {hidden > 0 ? `See all projects (${hidden} more)` : "See all projects"}
            <HiArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
