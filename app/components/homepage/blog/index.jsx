import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';
import BlogCard from './blog-card';
import { SectionHeading, StaggerContainer, StaggerItem } from '../../helper/motion';

function Blog({ blogs }) {
  const withCovers = blogs.filter((b) => b?.cover_image).slice(0, 6);
  if (!withCovers.length) return null;

  return (
    <section id="blogs" aria-labelledby="blogs-heading" className="relative scroll-mt-24 py-12 lg:py-20">
      <SectionHeading eyebrow="Writing" title={<span id="blogs-heading">Blog</span>} className="mb-10" />

      <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {withCovers.map((blog) => (
          <StaggerItem key={blog.id ?? blog.url} className="h-full">
            <BlogCard blog={blog} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="mt-10 flex justify-center">
        <Link href="/blog" className="btn btn-secondary">
          All posts <HiArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default Blog;
