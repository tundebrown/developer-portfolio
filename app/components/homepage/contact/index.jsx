import { personalData } from "@/utils/data/personal-data";
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { FadeLeft, FadeRight } from "../../helper/motion";
import ContactForm from "./contact-form";

const contactDetails = (d) => [
  { icon: MdAlternateEmail, label: "Email", value: d.email, href: `mailto:${d.email}` },
  { icon: IoMdCall, label: "Phone", value: d.phone, href: `tel:${d.phone}` },
  { icon: CiLocationOn, label: "Location", value: d.address },
];

const socialLinks = (d) => [
  { icon: IoLogoGithub, href: d.github, label: "GitHub" },
  { icon: BiLogoLinkedin, href: d.linkedIn, label: "LinkedIn" },
  { icon: SiUpwork, href: d.upwork, label: "Upwork" },
  { icon: FaFacebook, href: d.facebook, label: "Facebook" },
];

function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative scroll-mt-24 py-12 lg:py-20">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <FadeLeft>
          <ContactForm />
        </FadeLeft>

        <FadeRight delay={0.1} className="flex flex-col gap-6 lg:pt-24">
          <ul className="surface-card flex flex-col gap-5 p-5 sm:p-6">
            {contactDetails(personalData).map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="neu-raised grid h-10 w-10 shrink-0 place-items-center rounded-xl text-accent-text" aria-hidden="true">
                    <Icon size={17} />
                  </span>
                  <span>
                    <span className="block text-xs font-medium text-fg-subtle">{label}</span>
                    <span className="block text-sm font-medium text-fg">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className="flex items-center gap-4 rounded-lg hover:[&_span.text-fg]:text-accent-text">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div>
            <p className="mb-3 text-xs font-medium text-fg-subtle">Find me on</p>
            <ul className="flex flex-wrap items-center gap-3">
              {socialLinks(personalData).map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={href}
                    aria-label={label}
                    className="neu-button grid h-11 w-11 place-items-center rounded-xl"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeRight>
      </div>
    </section>
  );
}

export default ContactSection;
