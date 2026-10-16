"use client";
// @flow strict
import { useEffect, useState } from "react";
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { SectionHeading, SectionWrapper } from "../../helper/motion";
import { BsGithub } from "react-icons/bs";
import { MdOutlineCode } from "react-icons/md";
import { IoGitCommit } from "react-icons/io5";

const username = personalData.github
  .replace("https://github.com/", "")
  .replace(/\/$/, "");

/* ── Language colors ── */
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  SCSS: "#c6538c",
  Solidity: "#AA6746",
  Move: "#4a90d9",
  PLpgSQL: "#336791",
};
const getLangColor = (lang) => LANG_COLORS[lang] ?? "var(--accent)";

/* ── Contribution level → color ── */
function getContribColor(count) {
  // Mixed from theme tokens so the scale works in light and dark.
  const mix = (pct) => `color-mix(in oklab, var(--accent) ${pct}%, var(--surface-2))`;
  if (count === 0) return "var(--surface-2)";
  if (count <= 3) return mix(30);
  if (count <= 6) return mix(55);
  if (count <= 9) return mix(80);
  return "var(--accent)";
}

/* ── Skeleton ── */
function Skeleton({ w = "100%", h = "1.5rem", className = "" }) {
  return (
    <span
      className={`block rounded-lg bg-surface-2 animate-pulse ${className}`}
      style={{ width: w, height: h }}
    />
  );
}

/* ── Contribution graph ── */
function ContributionGraph({ data, total }) {
  if (!data) {
    return <Skeleton h="120px" />;
  }

  const weeks = data.weeks ?? [];
  const months = [];
  let lastMonth = -1;

  weeks.forEach((week, wi) => {
    const date = new Date(week.contributionDays[0]?.date);
    const month = date.getMonth();
    if (month !== lastMonth) {
      months.push({
        label: date.toLocaleString("default", { month: "short" }),
        weekIndex: wi,
      });
      lastMonth = month;
    }
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Month labels */}
        <div className="flex mb-1.5 pl-7" style={{ gap: "3px" }}>
          {weeks.map((_, wi) => {
            const m = months.find((m) => m.weekIndex === wi);
            return (
              <div key={wi} className="flex-shrink-0" style={{ width: 11 }}>
                {m && (
                  <span className="text-[0.55rem] text-fg-subtle font-medium whitespace-nowrap">
                    {m.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Day labels + cells */}
        <div className="flex gap-1.5">
          <div
            className="flex flex-col justify-around pr-1"
            style={{ gap: "3px" }}
          >
            {["Mon", "", "Wed", "", "Fri", "", ""].map((d, i) => (
              <div
                key={i}
                style={{ height: 11 }}
                className="text-[0.5rem] text-fg-subtle font-medium text-right leading-none flex items-center justify-end"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="flex flex-1" style={{ gap: "3px" }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: "3px" }}>
                {Array.from({ length: 7 - week.contributionDays.length }).map(
                  (_, i) => (
                    <div key={`pad-${i}`} style={{ width: 11, height: 11 }} />
                  ),
                )}
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: 2,
                      background: getContribColor(day.contributionCount),
                      flexShrink: 0,
                    }}
                    title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-2">
          <span className="text-[0.55rem] text-fg-subtle">Less</span>
          {[0, 2, 5, 8, 12].map((count) => (
            <div
              key={count}
              style={{
                width: 11,
                height: 11,
                borderRadius: 2,
                background: getContribColor(count),
                flexShrink: 0,
              }}
            />
          ))}
          <span className="text-[0.55rem] text-fg-subtle">More</span>
        </div>
      </div>
    </div>
  );
}

/* ── Language bar ── */
function LangBar({ languages }) {
  if (!languages) return <Skeleton w="100%" h="8px" />;

  const entries = Object.keys(languages);
  if (entries.length === 0) return null;

  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex w-full h-2.5 rounded-full overflow-hidden"
        style={{ gap: 1 }}
      >
        {sorted.map(([lang, bytes]) => (
          <div
            key={lang}
            style={{
              width: `${((bytes / total) * 100).toFixed(1)}%`,
              background: getLangColor(lang),
              flexShrink: 0,
            }}
            title={`${lang} ${((bytes / total) * 100).toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {sorted.map(([lang, bytes]) => (
          <div key={lang} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: getLangColor(lang) }}
            />
            <span className="text-[0.7rem] text-fg-muted font-semibold">
              {lang}
            </span>
            <span className="text-[0.65rem] text-fg-subtle">
              {((bytes / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function GitHubStats() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/github?username=${username}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(true);
          return;
        }
        setData(d);
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  return (
    <section id="github-stats" aria-labelledby="github-heading" className="relative scroll-mt-24 py-12 lg:py-20">
      <SectionHeading eyebrow="Activity" title={<span id="github-heading">GitHub</span>} className="mb-10" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <SectionWrapper className="surface-card min-w-0 p-5 lg:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h3 className="eyebrow flex items-center gap-2">
              <IoGitCommit size={14} aria-hidden="true" /> Contributions
            </h3>
            {data?.contributions?.totalContributions ? (
              <p className="text-xs text-fg-muted">
                {data.contributions.totalContributions.toLocaleString()} in the last year
              </p>
            ) : (
              <Skeleton w="160px" h="14px" />
            )}
          </div>
          <ContributionGraph data={data?.contributions} />
        </SectionWrapper>

        <SectionWrapper className="surface-card p-5 lg:p-6">
          <h3 className="eyebrow mb-5 flex items-center gap-2">
            <MdOutlineCode size={14} aria-hidden="true" /> Top languages
          </h3>
          <LangBar languages={data?.languages} />
        </SectionWrapper>
      </div>

      <div className="mt-8 flex justify-center">
        <Link href={personalData.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          <BsGithub size={15} aria-hidden="true" /> View GitHub profile
        </Link>
      </div>
    </section>
  );
}
