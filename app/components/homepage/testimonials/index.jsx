// @flow strict
import { testimonialsData } from "@/utils/data/testimonials";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
import { SectionHeading, StaggerContainer, StaggerItem } from "../../helper/motion";

function Testimonials() {
  return (
    <div id="testimonials" className="relative z-50 border-t border-indigo-500/10 my-12 lg:my-24">
      <div className="flex justify-center -translate-y-px">
        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      </div>
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-indigo-500/8 blur-3xl" />

      <SectionHeading eyebrow="What people say" title="Testimonials" className="my-8 lg:py-10" />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {testimonialsData.map((t) => (
          <StaggerItem key={t.id}>
            <TestimonialCard testimonial={t} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

function TestimonialCard({ testimonial: t }) {
  return (
    <div className="relative flex flex-col h-full rounded-2xl overflow-hidden
      bg-white/[0.025] border border-indigo-500/15 backdrop-blur-xl
      p-6 gap-5
      hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]
      transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="w-8 h-8 rounded-lg flex items-center justify-center
        bg-indigo-500/10 border border-indigo-500/20 text-indigo-400/60">
        <RiDoubleQuotesL size={14} />
      </div>

      <p className="text-sm text-white/55 leading-relaxed flex-1 italic">
        "{t.text}"
      </p>

      <div className="flex items-center gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <FaStar key={i} size={10} className="text-indigo-400/70" />
        ))}
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0
          bg-indigo-500/15 border border-indigo-500/20
          flex items-center justify-center">
          {t.image ? (
            <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" />
          ) : (
            <span className="text-sm font-bold text-indigo-300">
              {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-100 truncate">{t.name}</p>
          <p className="text-[0.65rem] text-white/40 truncate">
            {t.role}{t.company ? `, ${t.company}` : ""}
          </p>
        </div>
        <span className="shrink-0 px-2 py-0.5 rounded-full
          bg-indigo-500/7 border border-indigo-500/18
          text-[0.55rem] font-bold tracking-widest uppercase text-indigo-300/55">
          {t.source}
        </span>
      </div>

      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-indigo-500/12 rounded-br-2xl pointer-events-none" />
    </div>
  );
}

export default Testimonials;