// @flow strict
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import { SiUpwork } from "react-icons/si";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-16">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed top-[-120px] left-[-100px] w-[520px] h-[520px] rounded-full bg-indigo-600/9 blur-[90px] -z-10" />
      <div className="pointer-events-none fixed bottom-0 right-[-80px] w-[400px] h-[400px] rounded-full bg-indigo-500/6 blur-[90px] -z-10" />

      <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-12 gap-y-8 w-full">
        {/* ── LEFT ── */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
  bg-indigo-500/7 border border-indigo-500/20 mb-2"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse
    shadow-[0_0_6px_#818cf8]"
            />
            <span className="text-[0.65rem] font-semibold tracking-widest uppercase text-indigo-400">
              Available for work · WAT (UTC+1)
            </span>
          </div>

          {/* Specialisation pills */}
          {/* <div className="flex flex-wrap gap-2 mb-5">
            {[
              "DeFi Frontend",
              "Full-Stack SaaS",
              "Web3 Integrations",
              "Remote Worldwide",
            ].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full
        bg-white/3 border border-indigo-500/15
        text-[0.6rem] font-semibold tracking-widest uppercase text-white/40"
              >
                {tag}
              </span>
            ))}
          </div> */}

          {/* Headline */}
          <h1 className="text-3xl font-extrabold leading-tight lg:text-[2.6rem] lg:leading-[3.4rem] text-slate-100 mb-6">
            Hello, this is{" "}
            <span className="text-indigo-400">{personalData.name}</span>
            <br />
            {"I'm a Professional "}
            <span className="text-indigo-200">{personalData.designation}</span>.
          </h1>

          {/* Socials */}
          <div className="flex items-center gap-2.5 my-6">
            {[
              {
                href: personalData.github,
                icon: <BsGithub size={15} />,
                label: "GitHub",
              },
              {
                href: personalData.linkedIn,
                icon: <BsLinkedin size={15} />,
                label: "LinkedIn",
              },
              {
                href: personalData.facebook,
                icon: <FaFacebook size={15} />,
                label: "Facebook",
              },
              {
                href: personalData.upwork,
                icon: <SiUpwork size={15} />,
                label: "Upwork",
              },
              // { href: personalData.leetcode,  icon: <SiLeetcode size={14} />,      label: "LeetCode" },
              // { href: personalData.twitter,   icon: <FaTwitterSquare size={15} />, label: "Twitter"  },
            ].map(({ href, icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="w-9 h-9 rounded-xl flex items-center justify-center
                  bg-white/3 border border-indigo-500/18
                  text-white/45
                  hover:bg-indigo-500/12 hover:border-indigo-500/40 hover:text-white
                  hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(99,102,241,0.2)]
                  transition-all duration-200"
              >
                {icon}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl
                text-[0.72rem] font-bold tracking-widest uppercase text-white
                bg-indigo-600 hover:bg-indigo-500
                hover:shadow-[0_8px_24px_rgba(79,70,229,0.35)]
                hover:-translate-y-px
                transition-all duration-250"
            >
              Contact Me <RiContactsFill size={13} />
            </Link>
            <Link
              href={personalData.resume}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl
                text-[0.72rem] font-bold tracking-widest uppercase
                text-white/70 bg-white/3
                border border-indigo-500/25
                hover:bg-indigo-500/8 hover:border-indigo-500/45 hover:text-white
                transition-all duration-250"
            >
              Get Resume <MdDownload size={13} />
            </Link>
          </div>
        </div>

        {/* ── RIGHT — CODE PANEL ── */}
        <div
          className="order-1 lg:order-2 relative rounded-2xl overflow-hidden
          bg-white/[0.025] border border-indigo-500/18 backdrop-blur-xl
          shadow-[0_0_50px_rgba(99,102,241,0.07),inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          {/* Top bar */}
          <div className="flex flex-row">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
          </div>

          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[0.6rem] font-mono tracking-wider text-indigo-400/30">
              profile.ts
            </span>
          </div>

          {/* Code body */}
          <div className="overflow-hidden border-t border-indigo-900/40 px-4 lg:px-8 py-4 lg:py-6">
            <code className="font-mono text-xs md:text-sm lg:text-[0.8rem] leading-loose">
              <div className="blink">
                <span className="text-indigo-300">const </span>
                <span className="text-slate-200">coder</span>
                <span className="text-indigo-300"> = </span>
                <span className="text-white/30">{"{"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 text-slate-200">name: </span>
                <span className="text-white/30">'</span>
                <span className="text-indigo-200">{personalData.name}</span>
                <span className="text-white/30">',</span>
              </div>
              <div className="ml-4 lg:ml-8">
                <span className="text-slate-200">skills: </span>
                <span className="text-white/30">{"["}</span>
                {[
                  "React",
                  "NextJS",
                  "Redux",
                  "NodeJS",
                  "NestJS",
                  "PostgreSQL",
                  "MongoDB",
                  "Docker",
                ].map((s, i, arr) => (
                  <span key={s}>
                    <span className="text-indigo-200">{s}</span>
                    {i < arr.length - 1 && (
                      <span className="text-white/30">, </span>
                    )}
                  </span>
                ))}
                <span className="text-white/30">{"],"} </span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 text-slate-200">
                  hardWorker:{" "}
                </span>
                <span className="text-indigo-300">true</span>
                <span className="text-white/30">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 text-slate-200">
                  quickLearner:{" "}
                </span>
                <span className="text-indigo-300">true</span>
                <span className="text-white/30">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 text-slate-200">
                  problemSolver:{" "}
                </span>
                <span className="text-indigo-300">true</span>
                <span className="text-white/30">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 text-indigo-400">hireable</span>
                <span className="text-white/30">{"() {"}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 text-indigo-300">return </span>
                <span className="text-indigo-300">this</span>
                <span className="text-white/30">.</span>
                <span className="text-slate-200">skills.length </span>
                <span className="text-indigo-300">&gt;= </span>
                <span className="text-indigo-200">5</span>
                <span className="text-white/30">;</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 text-white/30">{"  },"}</span>
              </div>
              <div>
                <span className="text-white/30">{"}"}</span>
                <span className="ml-2 text-white/20 italic text-xs">
                  {"// open to opportunities"}
                </span>
              </div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
