import { certifications, volunteering } from "@/utils/data/credentials";
import { educations } from "@/utils/data/educations";
import { PiCertificate, PiGraduationCap, PiUsersThree } from "react-icons/pi";
import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import { SectionHeading, StaggerContainer, StaggerItem } from "../../helper/motion";

function IconBadge({ Icon }) {
  return (
    <span className="neu-raised grid h-11 w-11 shrink-0 place-items-center rounded-xl text-accent-text" aria-hidden="true">
      <Icon size={20} />
    </span>
  );
}

function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="relative scroll-mt-24 py-12 lg:py-20">
      <SectionHeading
        eyebrow="Background"
        title={<span id="education-heading">Education & credentials</span>}
        className="mb-10"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-6">
          {educations.map((edu) => (
            <article key={edu.id} className="surface-card flex gap-4 p-5 sm:p-6">
              <IconBadge Icon={PiGraduationCap} />
              <div>
                <h3 className="text-lg font-bold text-fg">{edu.title}</h3>
                <p className="text-sm font-medium text-accent-text">{edu.grade}</p>
                <p className="mt-1 text-sm text-fg-muted">{edu.institution}</p>
                <p className="mt-1 font-mono text-[0.75rem] text-fg-subtle">{edu.duration}</p>
              </div>
            </article>
          ))}

          <div className="neu-inset hidden rounded-[var(--r-xl)] p-6 lg:block">
            <div className="mx-auto max-w-[16rem]">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <section aria-labelledby="certs-heading" className="surface-card p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <IconBadge Icon={PiCertificate} />
              <h3 id="certs-heading" className="text-lg font-bold text-fg">Certifications</h3>
            </div>
            <StaggerContainer as="ul" className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {certifications.map((c) => (
                <StaggerItem as="li" key={c.id} className="border-t border-line py-3">
                  <p className="text-sm font-semibold text-fg">{c.title}</p>
                  <p className="text-xs text-fg-muted">
                    {c.issuer} · <span className="font-mono">{c.year}</span>
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <section aria-labelledby="volunteering-heading" className="surface-card p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <IconBadge Icon={PiUsersThree} />
              <h3 id="volunteering-heading" className="text-lg font-bold text-fg">Volunteering & community</h3>
            </div>
            <ul className="flex flex-col">
              {volunteering.map((v) => (
                <li key={v.id} className="border-t border-line py-3">
                  <p className="text-sm font-semibold text-fg">
                    {v.role} <span className="font-normal text-fg-muted">· {v.organisation}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{v.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Education;
