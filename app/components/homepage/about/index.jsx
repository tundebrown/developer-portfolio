// @flow strict
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { FadeLeft, FadeRight } from "../../helper/motion";

function AboutSection() {
  return (
    <div id="about" className="my-16 lg:my-24 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8 z-10">
        <span className="bg-indigo-600 text-white rotate-90 px-5 py-1.5
          text-[0.65rem] font-bold tracking-[0.25em] uppercase rounded-md
          shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          About Me
        </span>
        <span className="h-36 w-px bg-gradient-to-b from-indigo-500/50 to-transparent mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        {/* LEFT */}
        <FadeLeft className="order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-5 bg-indigo-500/50" />
            <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-indigo-400/70">
              Who I am
            </span>
            <span className="h-px w-5 bg-indigo-500/50" />
          </div>

          <div className="relative rounded-2xl overflow-hidden
            bg-white/[0.025] border border-indigo-500/15 backdrop-blur-xl
            p-6 lg:p-8
            shadow-[0_0_40px_rgba(99,102,241,0.05),inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent" />
            <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-indigo-400/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-indigo-400/10 rounded-br-2xl pointer-events-none" />

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed lg:leading-loose">
              {personalData.description}
            </p>

            <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-3 gap-4">
              {[
                { value: "7+",  label: "Years Exp."    },
                { value: "20+", label: "Projects"      },
                { value: "2",   label: "DeFi Products" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-lg font-extrabold text-indigo-300">{value}</p>
                  <p className="text-[0.6rem] font-medium tracking-widest uppercase text-white/35 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeLeft>

        {/* RIGHT */}
        <FadeRight className="flex justify-center order-1 lg:order-2" delay={0.15}>
          <div className="relative group">
            <div className="absolute -inset-3 rounded-2xl bg-indigo-600/15 blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute -inset-[1.5px] rounded-2xl bg-gradient-to-b from-indigo-500/40 to-indigo-500/10 opacity-50 group-hover:opacity-80 transition-all duration-500" />
            <div className="relative rounded-2xl overflow-hidden bg-[#060818] p-1 shadow-[0_0_40px_rgba(99,102,241,0.12)]">
              <Image
                src={personalData.profile}
                width={280}
                height={280}
                alt="Tunde Olupitan"
                className="rounded-xl transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 cursor-pointer block"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent to-[#060818]/40 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
            </div>
            <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#060818] border border-indigo-500/25 shadow-[0_0_16px_rgba(99,102,241,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[0.6rem] font-bold tracking-widest uppercase text-indigo-400">
                Available
              </span>
            </div>
          </div>
        </FadeRight>

      </div>
    </div>
  );
}

export default AboutSection;