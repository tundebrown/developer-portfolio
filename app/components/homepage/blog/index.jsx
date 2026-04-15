// @flow strict
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard from './blog-card';
import { SectionHeading, SectionWrapper, StaggerContainer, StaggerItem } from '../../helper/motion';

function Blog({ blogs }) {
  return (
    <div id="blogs" className="relative z-50 border-t border-indigo-500/10 my-12 lg:my-24">
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-indigo-500/8 blur-3xl" />

      <div className="flex justify-center -translate-y-px">
        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      </div>

      <SectionHeading eyebrow="My Thoughts" title="Blogs" className="my-8 lg:py-10" />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        {blogs.slice(0, 6).map(
          (blog, i) => blog?.cover_image && (
            <StaggerItem key={i}>
              <BlogCard blog={blog} />
            </StaggerItem>
          )
        )}
      </StaggerContainer>

      <SectionWrapper className="flex justify-center mt-8 lg:mt-14" delay={0.3}>
        <Link href="/blog"
          className="inline-flex items-center gap-1.5 hover:gap-3 px-6 py-2.5 rounded-xl
            text-[0.72rem] font-bold tracking-widest uppercase text-white
            bg-indigo-600 hover:bg-indigo-500
            hover:shadow-[0_8px_24px_rgba(79,70,229,0.35)]
            hover:-translate-y-px transition-all duration-250">
          <span>View More</span>
          <FaArrowRight size={12} />
        </Link>
      </SectionWrapper>
    </div>
  );
}

export default Blog;