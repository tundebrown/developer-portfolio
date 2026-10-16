import { projectTracks, projectsData } from '@/utils/data/projects-data';
import { withBlur } from '@/utils/project-images';
import { SectionHeading } from '../components/helper/motion';
import ProjectsShowcase from '../components/homepage/projects/projects-showcase';

export const metadata = {
  title: 'Projects · Tunde Olupitan',
  description: 'DeFi protocols, marketplaces, APIs and mobile apps built by Tunde Olupitan, Full-Stack Engineer.',
};

const page = () => {
  return (
    <section aria-labelledby="all-projects" className="relative py-12 lg:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Everything I've shipped"
        title={<span id="all-projects">All projects</span>}
        description="Each entry says what my role was. Team projects describe my part only."
        className="mb-10"
      />
      <ProjectsShowcase projects={withBlur(projectsData)} tracks={projectTracks} />
    </section>
  );
};

export default page;
