"use client";

import Image from "next/image";
import { HiChevronDown } from "react-icons/hi2";
import MediaCarousel from "./media-carousel";
import { ProjectLinks, ProjectMeta, ToolList, useLightbox } from "./project-parts";

/* Case-study layout for headline projects. Media alternates sides on desktop
   and stacks above the text on smaller screens. */
export default function FeaturedProject({ project, reverse = false, priority = false }) {
  const [openAt, lightbox] = useLightbox(project);
  const [first, ...more] = project.contributions;

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="surface-card grid grid-cols-1 overflow-hidden !rounded-[var(--r-xl)] lg:grid-cols-12"
    >
      {lightbox}

      {/* Screenshots sit in a framed 16:10 window so they're never cropped sideways. */}
      <div
        className={`relative flex items-center bg-surface-2 p-3 sm:p-6 lg:col-span-7 lg:p-8 ${
          reverse ? "lg:order-2 lg:border-l" : "lg:border-r"
        } border-b border-line lg:border-b-0`}
      >
        <MediaCarousel
          images={project.images}
          name={project.name}
          onOpen={openAt}
          priority={priority}
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="aspect-[16/10] w-full rounded-[var(--r-md)] border border-line shadow-[var(--shadow-md)]"
        />
        {project.phone && (
          <div
            className="neu-raised pointer-events-none absolute -bottom-2 right-3 z-10 hidden w-[20%] max-w-[9rem] overflow-hidden rounded-[1.4rem] p-1.5 md:block lg:bottom-4"
            aria-hidden="true"
          >
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1.05rem] bg-surface-2">
              <Image src={project.phone.src} alt="" fill sizes="160px" className="object-cover object-top" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 p-6 sm:p-8 lg:col-span-5">
        <div className="flex flex-col gap-2">
          <ProjectMeta project={project} />
          <h3 id={`${project.slug}-title`} className="text-2xl font-bold tracking-tight text-fg">
            {project.name}
          </h3>
          <p className="text-sm font-medium text-accent-text">{project.role}</p>
        </div>

        <p className="text-[0.95rem] leading-relaxed text-fg-muted">{project.summary}</p>

        {project.problem && (
          <div className="neu-inset rounded-[var(--r-md)] px-4 py-3">
            <p className="eyebrow mb-1 !text-[0.65rem]">The problem</p>
            <p className="text-sm leading-relaxed text-fg-muted">{project.problem}</p>
          </div>
        )}

        <div>
          <p className="eyebrow mb-2 !text-[0.65rem]">What I did</p>
          <p className="text-sm leading-relaxed text-fg">{first}</p>
          {more.length > 0 && (
            <details className="group mt-2">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded text-sm font-semibold text-accent-text [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Read the full case study</span>
                <span className="hidden group-open:inline">Show less</span>
                <HiChevronDown size={14} className="transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-fg-muted marker:text-accent">
                {more.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </details>
          )}
        </div>

        <ToolList tools={project.tools} />
        <div className="mt-auto pt-1">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
