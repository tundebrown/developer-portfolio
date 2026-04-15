// blog-card.jsx
// @flow strict
import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaArrowRight, FaCommentAlt } from 'react-icons/fa';

function BlogCard({ blog }) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden
      bg-white/[0.025] border border-indigo-500/15
      hover:border-indigo-500/35
      hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]
      hover:-translate-y-1
      transition-all duration-300"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="h-44 lg:h-48 w-full overflow-hidden relative shrink-0">
        <Image
          src={blog?.cover_image}
          height={1080}
          width={1920}
          alt={blog.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060818]/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5
          px-2.5 py-1 rounded-full
          bg-[#060818]/70 border border-indigo-500/20 backdrop-blur-sm
          text-[0.6rem] font-semibold tracking-widest uppercase text-indigo-300/70"
        >
          <span className="w-1 h-1 rounded-full bg-indigo-400" />
          {blog.reading_time_minutes} min read
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 lg:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[0.65rem] text-white/30 tracking-wide">
            {timeConverter(blog.published_at)}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[0.65rem] text-white/35">
              <BsHeartFill size={8} className="text-indigo-400" />
              {blog.public_reactions_count}
            </span>
            {blog.comments_count > 0 && (
              <span className="flex items-center gap-1 text-[0.65rem] text-white/35">
                <FaCommentAlt size={8} className="text-indigo-400/70" />
                {blog.comments_count}
              </span>
            )}
          </div>
        </div>

        <Link target="_blank" href={blog.url}>
          <h3 className="text-sm lg:text-base font-bold text-slate-100 leading-snug mb-2
            hover:text-indigo-300 transition-colors duration-200 line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        <p className="text-xs lg:text-sm text-white/40 leading-relaxed line-clamp-3 flex-1">
          {blog.description}
        </p>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          {blog.tag_list?.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {blog.tag_list.slice(0, 2).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full
                  text-[0.55rem] font-bold tracking-widest uppercase
                  bg-indigo-500/7 border border-indigo-500/18 text-indigo-300/55">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <Link target="_blank" href={blog.url}
            className="ml-auto flex items-center gap-1 text-[0.65rem] font-bold tracking-widest uppercase
              text-indigo-400/50 hover:text-indigo-300 transition-colors duration-200">
            Read <FaArrowRight size={8} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-indigo-500/12 rounded-br-2xl pointer-events-none" />
    </div>
  );
}

export default BlogCard;