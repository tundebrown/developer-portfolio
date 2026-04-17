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
const getLangColor = (lang) => LANG_COLORS[lang] ?? "#818cf8";

/* ── Contribution level → color ── */
function getContribColor(count) {
  if (count === 0) return "rgba(99,102,241,0.06)";
  if (count <= 3) return "rgba(99,102,241,0.25)";
  if (count <= 6) return "rgba(99,102,241,0.5)";
  if (count <= 9) return "rgba(99,102,241,0.75)";
  return "#818cf8";
}

/* ── Skeleton ── */
function Skeleton({ w = "100%", h = "1.5rem", className = "" }) {
  return (
    <span
      className={`block rounded-lg bg-indigo-500/8 animate-pulse ${className}`}
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
    <div className="w-full overflow-x-auto scrollbar-none flex justify-center">
      <div className="min-w-[600px]">
        {/* Month labels */}
        <div className="flex mb-1.5 pl-7" style={{ gap: "3px" }}>
          {weeks.map((_, wi) => {
            const m = months.find((m) => m.weekIndex === wi);
            return (
              <div key={wi} className="flex-shrink-0" style={{ width: 11 }}>
                {m && (
                  <span className="text-[0.55rem] text-white/30 font-medium whitespace-nowrap">
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
                className="text-[0.5rem] text-white/25 font-medium text-right leading-none flex items-center justify-end"
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
          <span className="text-[0.55rem] text-white/25">Less</span>
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
          <span className="text-[0.55rem] text-white/25">More</span>
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
            <span className="text-[0.7rem] text-white/60 font-semibold">
              {lang}
            </span>
            <span className="text-[0.65rem] text-white/25">
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
    <div
      id="github-stats"
      className="relative border-t border-indigo-500/10 my-12 lg:my-24"
    >
      <SectionHeading
        eyebrow="Activity"
        title="GitHub Stats"
        className="my-8 lg:py-10"
      />

      <div className="flex flex-col gap-4">
        {/* Contribution graph */}
        <SectionWrapper>
          <div
            className="relative p-5 lg:p-7 rounded-2xl
            bg-white/[0.025] border border-indigo-500/15 backdrop-blur-sm
            hover:border-indigo-500/25 transition-all duration-300"
          >
            <div
              className="absolute top-0 left-0 right-0 h-px
              bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent"
            />

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <IoGitCommit size={13} className="text-indigo-400/60" />
                <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white/35">
                  Contribution Graph
                </p>
              </div>
              {data?.contributions?.totalContributions ? (
                <p className="text-[0.65rem] text-white/30 font-medium">
                  {data.contributions.totalContributions.toLocaleString()}{" "}
                  contributions in the last year
                </p>
              ) : (
                <Skeleton w="200px" h="14px" />
              )}
            </div>

            <ContributionGraph
              data={data?.contributions}
              total={data?.contributions?.totalContributions}
            />
          </div>
        </SectionWrapper>

        {/* Top Languages */}
        <SectionWrapper delay={0.1}>
          <div
            className="relative p-5 lg:p-7 rounded-2xl
            bg-white/[0.025] border border-indigo-500/15 backdrop-blur-sm
            hover:border-indigo-500/25 transition-all duration-300"
          >
            <div
              className="absolute top-0 left-0 right-0 h-px
              bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent"
            />

            <div className="flex items-center gap-2 mb-5">
              <MdOutlineCode size={13} className="text-indigo-400/60" />
              <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white/35">
                Top Languages
              </p>
            </div>

            <LangBar languages={data?.languages} />
          </div>
        </SectionWrapper>
      </div>

      {/* CTA */}
      <SectionWrapper className="flex justify-center mt-6" delay={0.15}>
        <Link
          href={personalData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-white/3 border border-indigo-500/20 text-white/50
            text-[0.65rem] font-bold tracking-widest uppercase
            hover:bg-indigo-500/8 hover:border-indigo-500/35 hover:text-white
            transition-all duration-200"
        >
          <BsGithub size={13} />
          View GitHub Profile →
        </Link>
      </SectionWrapper>
    </div>
  );
}
