import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import { BsHeartFill } from 'react-icons/bs';
import { FaArrowRight, FaCommentAlt } from 'react-icons/fa';

function BlogCard({ blog }) {
  return (
    <article className="surface-card group relative flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong">
      <div className="relative h-44 w-full shrink-0 overflow-hidden border-b border-line lg:h-48">
        <Image
          src={blog?.cover_image}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          alt=""
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="glass absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-xs font-medium text-fg">
          {blog.reading_time_minutes} min read
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between text-xs text-fg-subtle">
          <time dateTime={blog.published_at}>{timeConverter(blog.published_at)}</time>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <BsHeartFill size={9} className="text-accent" aria-hidden="true" />
              <span className="sr-only">Reactions:</span>
              {blog.public_reactions_count}
            </span>
            {blog.comments_count > 0 && (
              <span className="flex items-center gap-1">
                <FaCommentAlt size={9} className="text-accent" aria-hidden="true" />
                <span className="sr-only">Comments:</span>
                {blog.comments_count}
              </span>
            )}
          </div>
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-fg">
          {/* Stretched link makes the whole card clickable with one tab stop. */}
          <a target="_blank" rel="noopener noreferrer" href={blog.url} className="after:absolute after:inset-0 hover:text-accent-text">
            {blog.title}
          </a>
        </h3>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-fg-muted">{blog.description}</p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          {blog.tag_list?.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {blog.tag_list.slice(0, 2).map((tag) => (
                <li key={tag} className="chip">#{tag}</li>
              ))}
            </ul>
          )}
          <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-accent-text" aria-hidden="true">
            Read <FaArrowRight size={9} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
