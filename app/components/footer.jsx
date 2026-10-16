import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { SiUpwork } from "react-icons/si";
import { personalData } from "@/utils/data/personal-data";

const quickLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "GitHub", href: personalData.github, Icon: BsGithub },
  { label: "LinkedIn", href: personalData.linkedIn, Icon: BsLinkedin },
  { label: "Upwork", href: personalData.upwork, Icon: SiUpwork },
  { label: "Email", href: `mailto:${personalData.email}`, Icon: MdAlternateEmail },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-elev/70">
      <div className="mx-auto flex max-w-[84rem] flex-col gap-8 px-4 py-10 sm:px-8 lg:px-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="text-base font-bold text-fg">{personalData.name}</p>
          <p className="mt-1 text-sm text-fg-muted">
            {personalData.designation} · {personalData.address}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-fg-muted">
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            Available for remote contracts and full-time roles
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {quickLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-fg-muted hover:text-accent-text">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2.5">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="neu-button grid h-10 w-10 place-items-center rounded-xl"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[84rem] px-4 py-4 text-xs text-fg-subtle sm:px-8 lg:px-12">
          © {year} {personalData.name}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
