import { projectTracks, projectsData } from '@/utils/data/projects-data';
import { withBlur } from '@/utils/project-images';
import { SectionHeading } from '../../helper/motion';
import ProjectsShowcase from './projects-showcase';

const Projects = () => {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative scroll-mt-24 py-12 lg:py-20">
      <SectionHeading
        eyebrow="Selected work"
        title={<span id="projects-heading">Projects</span>}
        description="Production DeFi protocols, marketplaces I built and run solo, and the internal tools and APIs behind them. Filter by the kind of work you're hiring for."
        className="mb-10"
      />
      <ProjectsShowcase projects={withBlur(projectsData)} tracks={projectTracks} standardLimit={4} showAllLink />
    </section>
  );
};

export default Projects;
