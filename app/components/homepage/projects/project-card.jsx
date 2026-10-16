"use client";

import MediaCarousel from "./media-carousel";
import { ProjectLinks, ProjectMeta, ToolList, useLightbox } from "./project-parts";

/* Compact card for secondary projects. */
export default function ProjectCard({ project }) {
  const [openAt, lightbox] = useLightbox(project);

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="surface-card flex h-full flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-md)]"
    >
      {lightbox}
      {project.images.length > 0 && (
        <MediaCarousel
          images={project.images}
          name={project.name}
          onOpen={openAt}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="aspect-[16/10] border-b border-line"
        />
      )}

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-1.5">
          <ProjectMeta project={project} />
          <h3 id={`${project.slug}-title`} className="text-lg font-bold tracking-tight text-fg">
            {project.name}
          </h3>
          <p className="text-[0.8rem] font-medium text-accent-text">{project.role}</p>
        </div>
        <p className="text-sm leading-relaxed text-fg-muted">{project.summary}</p>
        {project.contributions?.length > 0 && (
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[0.82rem] leading-relaxed text-fg-muted marker:text-accent">
            {project.contributions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-col gap-4 pt-1">
          <ToolList tools={project.tools} max={6} />
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  );
}
