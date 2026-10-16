import { skillGroups, skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { SectionHeading, StaggerContainer, StaggerItem } from "../../helper/motion";

// Monochrome logos that would disappear on a dark background.
const INVERT_IN_DARK = new Set(["Next JS"]);

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative scroll-mt-24 py-12 lg:py-20">
      <SectionHeading
        eyebrow="Toolbox"
        title={<span id="skills-heading">Skills</span>}
        description="What I use day to day, grouped the way I'd staff a project."
        className="mb-10"
      />

      <div
        aria-hidden="true"
        className="neu-inset -mx-1 flex flex-col gap-4 overflow-hidden rounded-[var(--r-xl)] py-5 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
      >
        <Marquee gradient={false} speed={40} pauseOnHover direction="left">
          {skillsData.map((skill) => <SkillPill key={skill} skill={skill} />)}
        </Marquee>
        <Marquee gradient={false} speed={32} pauseOnHover direction="right">
          {[...skillsData].reverse().map((skill) => <SkillPill key={skill} skill={skill} />)}
        </Marquee>
      </div>

      <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map(({ title, items }) => (
          <StaggerItem key={title} className="surface-card p-5">
            <h3 className="eyebrow mb-3">{title}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <li key={item} className="chip">{item}</li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

function SkillPill({ skill }) {
  const icon = skillsImage(skill);
  return (
    <div className="mx-2 flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 shadow-[var(--shadow-sm)]">
      {icon && (
        <Image
          src={icon.src}
          alt=""
          width={20}
          height={20}
          className={`h-5 w-5 object-contain ${INVERT_IN_DARK.has(skill) ? "dark:invert" : ""}`}
        />
      )}
      <span className="whitespace-nowrap text-sm font-medium text-fg">{skill}</span>
    </div>
  );
}

export default Skills;
