import { experiences } from "@/utils/data/experience";
import { projectTracks } from "@/utils/data/projects-data";
import { HiArrowUpRight } from "react-icons/hi2";
import experienceAnimation from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import { SectionHeading, StaggerContainer, StaggerItem } from "../../helper/motion";

const trackLabel = Object.fromEntries(projectTracks.map(({ id, label }) => [id, label]));

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative scroll-mt-24 py-12 lg:py-20">
      <SectionHeading
        eyebrow="Career"
        title={<span id="experience-heading">Experience</span>}
        description="Roles run from newest to oldest. Several overlap, because I've kept freelance work alongside contract and full-time roles."
        className="mb-10"
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[18rem_1fr] lg:gap-12">
        <div className="hidden lg:block">
          <div className="neu-inset sticky top-28 rounded-[var(--r-xl)] p-6">
            <AnimationLottie animationPath={experienceAnimation} />
          </div>
        </div>

        <StaggerContainer as="ol" className="relative flex flex-col gap-5 border-l border-line pl-6 sm:pl-8">
          {experiences.map((exp) => (
            <StaggerItem as="li" key={exp.id} className="relative">
              <span
                className="absolute -left-[1.85rem] top-7 h-3 w-3 rounded-full border-2 border-accent bg-canvas sm:-left-[2.35rem]"
                aria-hidden="true"
              />
              <GlowCard identifier={`experience-${exp.id}`}>
                <div className="relative p-5 sm:p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-fg">{exp.title}</h3>
                      <p className="text-sm font-medium text-accent-text">{exp.company}</p>
                    </div>
                    <p className="shrink-0 font-mono text-[0.75rem] text-fg-subtle sm:text-right">
                      <time>{exp.start}</time> – <time>{exp.end}</time>
                      <span className="block">{exp.location}</span>
                    </p>
                  </div>

                  <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-fg-muted marker:text-accent">
                    {exp.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <ul className="flex flex-wrap gap-1.5" aria-label="Focus areas">
                      {exp.tracks.map((t) => (
                        <li key={t} className="chip">{trackLabel[t]}</li>
                      ))}
                    </ul>
                    {exp.links.map(({ label, href }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent-text hover:underline"
                      >
                        {label} <HiArrowUpRight size={11} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default Experience;
