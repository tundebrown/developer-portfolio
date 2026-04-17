// @flow strict
import { educations } from "@/utils/data/educations";
import { PiGraduationCapBold } from "react-icons/pi";
import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import { FadeLeft, FadeRight, SectionHeading, StaggerContainer, StaggerItem } from "../../helper/motion";

function Education() {
  return (
    <div id="education" className="relative border-t border-indigo-500/10 my-12 lg:my-24">
      <div className="flex justify-center -translate-y-px">
        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      </div>

      <SectionHeading eyebrow="My Background" title="Education" className="my-8 lg:py-10" />

      <div className="py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          <FadeLeft className="flex justify-center items-center">
            <div className="w-full max-w-xs">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </FadeLeft>

          <StaggerContainer className="flex flex-col gap-4">
            {educations.map((education) => (
              <StaggerItem key={education.id}>
                <GlowCard identifier={`education-${education.id}`}>
                  <div className="p-4 relative overflow-hidden text-white">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />
                    <div className="flex justify-center mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                        bg-indigo-500/7 border border-indigo-500/18
                        text-[0.65rem] font-semibold tracking-widest uppercase text-indigo-400">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        {education.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 px-2 py-3">
                      <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                        bg-indigo-500/8 border border-indigo-500/18 text-indigo-400
                        transition-all duration-300
                        hover:scale-110 hover:bg-indigo-500/15 hover:shadow-[0_0_18px_rgba(99,102,241,0.25)]">
                        <PiGraduationCapBold size={22} />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-bold uppercase tracking-wide text-slate-100 mb-1">
                          {education.title}
                        </p>
                        <p className="text-xs sm:text-sm text-white/45 font-medium">
                          {education.institution}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-indigo-500/12 rounded-br-xl pointer-events-none" />
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </div>
    </div>
  );
}

export default Education;