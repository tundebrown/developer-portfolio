import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Testimonials from "./components/homepage/testimonials";
import GitHubStats from "./components/homepage/github-stats";

// A dev.to outage should hide the blog section, not take down the page.
async function getBlogs() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter((item) => item?.cover_image);
  } catch {
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();
  return (
    <>
      <HeroSection />
      <Projects />
      <AboutSection />
      <Experience />
      <Skills />
      <GitHubStats />
      <Testimonials />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </>
  );
}
