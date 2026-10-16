import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { FadeLeft, FadeRight, SectionHeading } from "../../helper/motion";

// Every figure is stated in the CVs.
const stats = [
  { value: "7+", label: "Years building for the web" },
  { value: "5", label: "DeFi dApps shipped" },
  { value: "10k+", label: "Active users supported" },
  { value: "100%", label: "Upwork Job Success · Top Rated" },
];

function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative scroll-mt-24 py-12 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        <FadeLeft>
          <SectionHeading eyebrow="About" title={<span id="about-heading">Who I am</span>} className="mb-6" />
          <p className="max-w-2xl text-base leading-relaxed text-fg-muted lg:text-[1.05rem] lg:leading-8">
            {personalData.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="neu-raised rounded-[var(--r-md)] px-4 py-4">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block text-2xl font-extrabold tracking-tight text-accent-text">{value}</span>
                  <span className="mt-1 block text-xs leading-snug text-fg-muted">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </FadeLeft>

        <FadeRight className="flex justify-center" delay={0.1}>
          <figure className="neu-raised relative rounded-[var(--r-xl)] p-2">
            <Image
              src={personalData.profile}
              width={300}
              height={300}
              alt={`Portrait of ${personalData.name}`}
              className="block rounded-[calc(var(--r-xl)-6px)]"
            />
            <figcaption className="glass absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-fg">
              <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
              Open to remote roles
            </figcaption>
          </figure>
        </FadeRight>
      </div>
    </section>
  );
}

export default AboutSection;
