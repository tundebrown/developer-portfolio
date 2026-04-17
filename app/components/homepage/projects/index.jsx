import { projectsData } from '@/utils/data/projects-data';
import { SectionHeading, SectionWrapper, StaggerContainer, StaggerItem } from '../../helper/motion';
import ProjectCard from './project-card';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const Projects = () => {
  return (
    <div id="projects" className="relative  my-12 lg:my-24">

      <SectionHeading eyebrow="What I've built" title="Projects" className="mb-10" />

      <StaggerContainer className="flex flex-col gap-8">
        {projectsData.slice(0, 6).map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <SectionWrapper className="flex justify-center mt-8 lg:mt-14" delay={0.3}>
        <Link href="/project"
          className="inline-flex items-center gap-1.5 hover:gap-3 px-6 py-2.5 rounded-xl
            text-[0.72rem] font-bold tracking-widest uppercase text-white
            bg-indigo-600 hover:bg-indigo-500
            hover:shadow-[0_8px_24px_rgba(79,70,229,0.35)]
            hover:-translate-y-px transition-all duration-250">
          <span>View More Projects</span>
          <FaArrowRight size={12} />
        </Link>
      </SectionWrapper>
    </div>
  );
};

export default Projects;