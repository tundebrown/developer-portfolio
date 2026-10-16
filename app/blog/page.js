import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";
import { SectionHeading, StaggerContainer, StaggerItem } from "../components/helper/motion";

export const metadata = {
  title: "Blog · Tunde Olupitan",
  description: "Articles by Tunde Olupitan on dev.to.",
};

async function getBlogs() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return (await res.json()).filter((b) => b?.cover_image);
  } catch {
    return [];
  }
}

async function page() {
  const blogs = await getBlogs();

  return (
    <section aria-labelledby="blog-title" className="relative py-12 lg:py-20">
      <SectionHeading as="h1" eyebrow="Writing" title={<span id="blog-title">Blog</span>} className="mb-10" />

      {blogs.length ? (
        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <StaggerItem key={blog.id ?? blog.url} className="h-full">
              <BlogCard blog={blog} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <p className="surface-card p-6 text-fg-muted">Posts couldn&apos;t be loaded right now. Please try again later.</p>
      )}
    </section>
  );
}

export default page;
