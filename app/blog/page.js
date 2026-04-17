// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";
import { SectionHeading, StaggerContainer, StaggerItem } from "../components/helper/motion";

async function getBlogs() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();
  return data;
};

async function page() {
  const blogs = await getBlogs();

  return (
    // <div className="py-8">
    //   <div className="flex justify-center my-5 lg:py-8">
    //     <div className="flex  items-center">
    //       <span className="w-24 h-[2px] bg-[#1a1443]"></span>
    //       <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
    //         All Blog
    //       </span>
    //       <span className="w-24 h-[2px] bg-[#1a1443]"></span>
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
    //     {
    //       blogs.map((blog, i) => (
    //         blog?.cover_image &&
    //         <BlogCard blog={blog} key={i} />
    //       ))
    //     }
    //   </div>
    // </div>

    <div id="blogs" className="relative z-50 my-12 lg:my-24">

      <SectionHeading eyebrow="" title="Blogs" className="mb-10" />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 gap-8">
        {blogs.map((blog, i) => (
          blog?.cover_image &&
          <StaggerItem key={i}>
            <BlogCard blog={blog} key={i} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default page;