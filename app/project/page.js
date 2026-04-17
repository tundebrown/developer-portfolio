import { projectsData } from '@/utils/data/projects-data';


import { SectionHeading, StaggerContainer, StaggerItem } from '../components/helper/motion';
import ProjectCard from '../components/homepage/projects/project-card';

const page = () => {
  return (
    <div id="projects" className="relative z-50 my-12 lg:my-24">

      <SectionHeading eyebrow="What I've built" title="Projects" className="mb-10" />

      <StaggerContainer className="flex flex-col gap-12">
        {projectsData.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default page;