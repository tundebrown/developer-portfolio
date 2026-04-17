// @flow strict
import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { SectionHeading, SectionWrapper } from "../../helper/motion";

function Skills() {
  return (
    <div id="skills" className="relative border-t border-indigo-500/10 my-12 lg:my-24">
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-indigo-500/8 blur-3xl" />

      <div className="flex justify-center -translate-y-px">
        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      </div>

      <SectionHeading eyebrow="What I work with" title="Skills" className="my-8 lg:py-10" />

      <SectionWrapper className="w-full flex flex-col gap-5 my-10">
        <Marquee gradient={false} speed={50} pauseOnHover pauseOnClick direction="left">
          {skillsData.map((skill, id) => <SkillPill key={id} skill={skill} />)}
        </Marquee>
        <Marquee gradient={false} speed={40} pauseOnHover pauseOnClick direction="right">
          {[...skillsData].reverse().map((skill, id) => <SkillPill key={id} skill={skill} />)}
        </Marquee>
      </SectionWrapper>
    </div>
  );
}

function SkillPill({ skill }) {
  return (
    <div className="mx-3 group relative flex flex-col items-center justify-center w-28 sm:w-32 cursor-pointer">
      <div className="relative w-full rounded-2xl overflow-hidden
        bg-white/[0.025] border border-indigo-500/15
        group-hover:border-indigo-500/40
        group-hover:bg-indigo-500/6
        group-hover:shadow-[0_0_22px_rgba(99,102,241,0.15)]
        group-hover:-translate-y-1
        transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="flex flex-col items-center justify-center gap-3 p-5">
          <div className="h-9 w-9 flex items-center justify-center
            rounded-xl bg-white/4 border border-indigo-500/15
            group-hover:border-indigo-400/30 group-hover:bg-indigo-500/8
            transition-all duration-300">
            <Image
              src={skillsImage(skill)?.src}
              alt={skill}
              width={24}
              height={24}
              className="h-6 w-auto object-contain"
            />
          </div>
          <p className="text-white/50 text-[0.7rem] font-semibold tracking-wide text-center group-hover:text-white transition-colors duration-300">
            {skill}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Skills;