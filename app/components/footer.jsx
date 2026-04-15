// @flow strict
import Link from "next/link";
import { CgGitFork } from "react-icons/cg";
import { IoStar } from "react-icons/io5";

function Footer() {
  return (
    <footer className="relative border-t border-indigo-500/10 bg-[#060818]/90 backdrop-blur-xl text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © Built by{" "}
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/abu-said-bd/"
              className="text-indigo-400 font-semibold hover:underline"
            >
              Tunde Olupitan
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <Link
              target="_blank"
              href="https://github.com/said7388/developer-portfolio"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                text-[0.65rem] font-bold tracking-widest uppercase
                text-white/45 bg-white/3 border border-indigo-500/18
                hover:bg-indigo-500/10 hover:border-indigo-500/35 hover:text-white
                transition-all duration-200"
            >
              <IoStar size={10} /> Star
            </Link>

            <div className="w-px h-4 bg-indigo-500/18" />

            <Link
              target="_blank"
              href="https://github.com/said7388/developer-portfolio/fork"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                text-[0.65rem] font-bold tracking-widest uppercase
                text-white/45 bg-white/3 border border-indigo-500/18
                hover:bg-indigo-500/10 hover:border-indigo-500/35 hover:text-white
                transition-all duration-200"
            >
              <CgGitFork size={11} /> Fork
            </Link>
          </div>
        </div>

        <p className="text-center text-[0.6rem] text-white/20 tracking-wider mt-3">
          Powered by Next.js · Deployed with Vercel · Designed in the dark
        </p>
      </div>
    </footer>
  );
}

export default Footer;