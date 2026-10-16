import { personalData } from "@/utils/data/personal-data";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { SiUpwork } from "react-icons/si";
import FocusChips from "./focus-chips";

const socials = [
  { href: personalData.github, Icon: BsGithub, label: "GitHub" },
  { href: personalData.linkedIn, Icon: BsLinkedin, label: "LinkedIn" },
  { href: personalData.upwork, Icon: SiUpwork, label: "Upwork" },
  { href: personalData.facebook, Icon: FaFacebook, label: "Facebook" },
];

// Every value here comes from the CVs.
const profile = [
  ["role", `'${personalData.designation}'`],
  ["location", `'${personalData.address}'`],
  ["experience", "'7+ years'"],
  ["shipping", "['Surf Lending', 'Bodega Market']"],
  ["upwork", "'Top Rated · 100% JSS'"],
];

const stack = ["React", "Next.js", "TypeScript", "Node.js", "Nest.js", "Laravel", "PostgreSQL", "Docker", "React Native"];

function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative grid grid-cols-1 items-center gap-12 pt-14 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-20 lg:pb-24"
    >
      <div className="flex flex-col items-start">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-fg-muted">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          Available for work · Lagos, WAT (UTC+1)
        </p>

        <h1 id="hero-title" className="text-4xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-[3.5rem]">
          {personalData.name}
          <span className="mt-2 block text-accent-text">{personalData.designation}</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
          {personalData.headline} Seven-plus years across Web3, product frontends, APIs and the servers they run on.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn btn-primary">
            View my work
          </a>
          <a href={personalData.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Résumé <HiArrowUpRight size={14} aria-hidden="true" />
          </a>
          <ul className="ml-1 flex items-center gap-2">
            {socials.map(({ href, Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="neu-button grid h-10 w-10 place-items-center rounded-xl"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 w-full">
          <p className="mb-3 text-xs font-medium text-fg-subtle">Browse work by focus</p>
          <FocusChips areas={personalData.focusAreas} />
        </div>
      </div>

      {/* Profile panel: glass over the backdrop mesh */}
      <div className="glass relative overflow-hidden rounded-[var(--r-xl)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[0.7rem] text-fg-subtle">profile.ts</span>
        </div>

        <pre className="overflow-x-auto px-5 py-6 font-mono text-[0.8rem] leading-7 sm:px-7 sm:text-[0.85rem]">
          <code>
            <span className="text-accent-text">const</span> <span className="text-fg">engineer</span>{" "}
            <span className="text-fg-subtle">= {"{"}</span>
            {"\n"}
            {profile.map(([key, value]) => (
              <span key={key}>
                {"  "}
                <span className="text-fg">{key}</span>
                <span className="text-fg-subtle">: </span>
                <span className="text-signal">{value}</span>
                <span className="text-fg-subtle">,</span>
                {"\n"}
              </span>
            ))}
            {"  "}
            <span className="text-fg">stack</span>
            <span className="text-fg-subtle">: [</span>
            {"\n"}
            {stack.map((s, i) => (
              <span key={s}>
                {i % 3 === 0 && "    "}
                <span className="text-signal">&apos;{s}&apos;</span>
                <span className="text-fg-subtle">{i < stack.length - 1 ? ", " : ""}</span>
                {(i % 3 === 2 || i === stack.length - 1) && "\n"}
              </span>
            ))}
            {"  "}
            <span className="text-fg-subtle">],</span>
            {"\n"}
            <span className="text-fg-subtle">{"};"}</span>
          </code>
        </pre>
      </div>
    </section>
  );
}

export default HeroSection;
