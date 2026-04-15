import { projectsData } from '@/utils/data/projects-data';
import { SectionHeading, StaggerContainer, StaggerItem } from '../../helper/motion';
import ProjectCard from './project-card';

const Projects = () => {
  return (
    <div id="projects" className="relative z-50 my-12 lg:my-24">

      <SectionHeading eyebrow="What I've built" title="Projects" className="mb-10" />

      <StaggerContainer className="flex flex-col gap-8">
        {projectsData.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default Projects;