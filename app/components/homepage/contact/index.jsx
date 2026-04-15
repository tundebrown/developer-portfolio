// @flow strict
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import {
  FadeLeft,
  FadeRight,
  StaggerContainer,
  StaggerItem,
} from "../../helper/motion";
import ContactForm from "./contact-form";

const contactDetails = (d) => [
  { icon: MdAlternateEmail, label: "Email", value: d.email },
  { icon: IoMdCall, label: "Phone", value: d.phone },
  { icon: CiLocationOn, label: "Location", value: d.address },
];

const socialLinks = (d) => [
  { icon: IoLogoGithub, href: d.github, label: "GitHub" },
  { icon: BiLogoLinkedin, href: d.linkedIn, label: "LinkedIn" },
  // { icon: FaXTwitter,      href: d.twitter,       label: "Twitter"        },
  // { icon: FaStackOverflow, href: d.stackOverflow, label: "Stack Overflow" },
  { icon: FaFacebook, href: d.facebook, label: "Facebook" },
  { icon: SiUpwork, href: d.upwork, label: "Upwork" },
];

function ContactSection() {
  return (
    <div id="contact" className="relative my-12 lg:my-24 mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8 z-10">
        <span
          className="bg-indigo-600 text-white rotate-90 px-5 py-1.5
          text-[0.65rem] font-bold tracking-[0.25em] uppercase rounded-md
          shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        >
          Contact
        </span>
        <span className="h-36 w-px bg-gradient-to-b from-indigo-500/50 to-transparent mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <FadeLeft>
          <ContactForm />
        </FadeLeft>

        <FadeRight delay={0.15} className="flex flex-col gap-8 lg:pt-16">
          <StaggerContainer
            className="relative rounded-2xl overflow-hidden
            bg-white/[0.025] border border-indigo-500/15 backdrop-blur-xl
            p-5 lg:p-7
            shadow-[0_0_40px_rgba(99,102,241,0.05),inset_0_1px_0_rgba(255,255,255,0.03)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent" />
            <div className="flex flex-col gap-5">
              {contactDetails(personalData).map(
                ({ icon: Icon, label, value }) => (
                  <StaggerItem key={label}>
                    <div className="flex items-center gap-4 group">
                      <div
                        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                      bg-white/4 border border-indigo-500/18 text-white/40
                      group-hover:bg-indigo-500/10 group-hover:border-indigo-500/35 group-hover:text-indigo-400
                      transition-all duration-300"
                      >
                        <Icon size={16} />
                      </div>
                      <Link
                        href={
                          label === "Email"
                            ? `mailto:${value}`
                            : label === "Phone"
                              ? `tel:${value}`
                              : "#"
                        }
                      >
                        <p className="text-[0.6rem] font-semibold tracking-widest uppercase text-white/25 mb-0.5">
                          {label}
                        </p>
                        <p className="text-sm text-white/65 font-medium">
                          {value}
                        </p>
                      </Link>
                    </div>
                  </StaggerItem>
                ),
              )}
            </div>
          </StaggerContainer>

          <StaggerContainer className="flex flex-col gap-4">
            <StaggerItem>
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/25">
                Find me on
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center gap-3 flex-wrap">
                {socialLinks(personalData).map(
                  ({ icon: Icon, href, label }) => (
                    <Link
                      key={label}
                      target="_blank"
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-xl flex items-center justify-center
                      bg-white/3 border border-indigo-500/18 text-white/40
                      hover:bg-indigo-500/10 hover:border-indigo-500/35 hover:text-indigo-400
                      hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(99,102,241,0.18)]
                      transition-all duration-200"
                    >
                      <Icon size={17} />
                    </Link>
                  ),
                )}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </FadeRight>
      </div>
    </div>
  );
}

export default ContactSection;
