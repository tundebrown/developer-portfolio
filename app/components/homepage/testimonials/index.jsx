import { testimonialsData } from "@/utils/data/testimonials";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
import { SectionHeading, StaggerContainer, StaggerItem } from "../../helper/motion";

function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="relative scroll-mt-24 py-12 lg:py-20">
      <SectionHeading
        eyebrow="Kind words"
        title={<span id="testimonials-heading">Testimonials</span>}
        className="mb-10"
      />

      <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map((t) => (
          <StaggerItem key={t.id} className="h-full">
            <TestimonialCard testimonial={t} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

function TestimonialCard({ testimonial: t }) {
  return (
    <figure className="surface-card flex h-full flex-col gap-5 p-6">
      <span className="neu-inset grid h-9 w-9 place-items-center rounded-lg text-accent-text" aria-hidden="true">
        <RiDoubleQuotesL size={15} />
      </span>

      <blockquote className="flex-1 text-[0.92rem] leading-relaxed text-fg-muted">
        <p>{t.text}</p>
      </blockquote>

      <div className="flex items-center gap-1" role="img" aria-label={`Rated ${t.rating} out of 5`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <FaStar key={i} size={11} className="text-accent" aria-hidden="true" />
        ))}
      </div>

      <figcaption className="flex items-center gap-3 border-t border-line pt-4">
        <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-accent/10">
          {t.image ? (
            <Image src={t.image} alt="" fill className="object-cover" sizes="40px" />
          ) : (
            <span className="text-sm font-bold text-accent-text" aria-hidden="true">
              {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-fg">{t.name}</p>
          <p className="truncate text-xs text-fg-muted">
            {t.role}{t.company ? `, ${t.company.trim()}` : ""}
          </p>
        </div>
        <span className="chip shrink-0">{t.source}</span>
      </figcaption>
    </figure>
  );
}

export default Testimonials;
