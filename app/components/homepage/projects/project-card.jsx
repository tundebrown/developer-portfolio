"use client";
// @flow strict
import * as React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BsCodeSlash } from 'react-icons/bs';
import { RiExternalLinkLine, RiGithubLine } from 'react-icons/ri';
import { MdPlayCircle, MdPauseCircle } from 'react-icons/md';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const normalizeSrc = (src) => {
  if (!src) return '';
  return src.startsWith('/') ? src : `/${src}`;
};

const isYoutube = (src) =>
  src?.includes('youtube.com') || src?.includes('youtu.be');

const youtubeEmbedUrl = (src) => {
  if (!src) return '';
  const match = src.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match
    ? `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1&autoplay=1`
    : src;
};

/* ─────────────────────────────────────────
   SLIDE MEDIA
───────────────────────────────────────── */
function SlideMedia({ item, projectName, index, videoRef, isPlaying, togglePlay }) {
  if (!item) return null;

  if (item.type === 'image') {
    return (
      <img
        src={item.src}
        alt={`${projectName} screenshot ${index + 1}`}
        draggable={false}
        className="max-w-full max-h-full object-contain rounded-xl select-none
          shadow-[0_0_80px_rgba(99,102,241,0.12)] border border-indigo-500/10"
        style={{ display: 'block' }}
      />
    );
  }

  if (isYoutube(item.src)) {
    return (
      <div className="w-full max-w-4xl" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={youtubeEmbedUrl(item.src)}
          title={`${projectName} demo`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-xl border border-indigo-500/20"
        />
      </div>
    );
  }

  return (
    <div className="relative max-w-full max-h-full flex items-center justify-center">
      <video
        ref={videoRef}
        src={item.src}
        loop
        playsInline
        className="max-w-full max-h-full rounded-xl border border-indigo-500/20 object-contain"
      />
      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center group"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <span className={`text-white/80 group-hover:text-white transition-all duration-200
          drop-shadow-lg ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          {isPlaying ? <MdPauseCircle size={64} /> : <MdPlayCircle size={64} />}
        </span>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────── */
function Lightbox({ items, startIndex, projectName, onClose }) {
  const [[index, direction], setPage] = useState([startIndex, 0]);
  const [isPlaying, setIsPlaying]     = useState(false);
  const videoRef = useRef(null);
  const activeItem = items[index];

  const paginate = useCallback((newDir) => {
    setIsPlaying(false);
    setPage(([cur]) => {
      const next = (cur + newDir + items.length) % items.length;
      return [next, newDir];
    });
  }, [items.length]);

  const goTo = useCallback((idx) => {
    setIsPlaying(false);
    setPage(([cur]) => [idx, idx > cur ? 1 : -1]);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [paginate, onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else           { videoRef.current.play();  setIsPlaying(true);  }
  };

  /* Framer Motion variants */
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.92,
      filter: 'blur(8px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x:       { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.25 },
        scale:   { duration: 0.35 },
        filter:  { duration: 0.3  },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.92,
      filter: 'blur(8px)',
      transition: {
        x:       { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.2 },
        scale:   { duration: 0.25 },
        filter:  { duration: 0.2  },
      },
    }),
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[9998] cursor-pointer"
        style={{ background: 'rgba(4,4,18,0.92)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Shell */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto auto' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* HEADER */}
        <div
          className="pointer-events-auto flex items-center justify-between px-5 py-4
            border-b border-indigo-500/15"
          style={{ background: 'rgba(6,8,24,0.92)', backdropFilter: 'blur(20px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 min-w-0">
            {items.length > 1 && (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="shrink-0 px-2.5 py-1 rounded-full
                  bg-indigo-500/10 border border-indigo-500/20
                  text-[0.6rem] font-bold tracking-widest text-indigo-300/80 tabular-nums"
              >
                {index + 1} / {items.length}
              </motion.span>
            )}
            <span className="text-sm font-semibold text-slate-300 tracking-wide truncate">
              {projectName}
            </span>
            {activeItem?.type === 'video' && (
              <span className="shrink-0 px-2 py-0.5 rounded-full
                bg-indigo-500/10 border border-indigo-500/20
                text-[0.55rem] font-bold tracking-widest uppercase text-indigo-300/70">
                Video
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center
              bg-white/5 border border-indigo-500/20 text-white/50
              hover:bg-indigo-500/15 hover:border-indigo-500/40 hover:text-white
              transition-all duration-200"
            aria-label="Close"
          >
            <IoClose size={16} />
          </button>
        </div>

        {/* STAGE */}
        <div
          className="relative overflow-hidden pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Prev */}
          {items.length > 1 && (
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous"
              className="pointer-events-auto absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30
                w-10 h-10 rounded-full flex items-center justify-center
                bg-[#060818]/90 border border-indigo-500/25
                text-white/60 hover:text-white hover:bg-indigo-600/80
                backdrop-blur-sm transition-all duration-200
                shadow-[0_0_20px_rgba(99,102,241,0.2)]"
            >
              <HiChevronLeft size={20} />
            </button>
          )}

          {/* Animated slide */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="pointer-events-auto absolute inset-0
                flex items-center justify-center px-16 sm:px-20 py-4"
              onClick={(e) => e.stopPropagation()}

              /* swipe gesture support */
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60)  paginate(1);
                if (info.offset.x > 60)   paginate(-1);
              }}
            >
              <SlideMedia
                item={activeItem}
                projectName={projectName}
                index={index}
                videoRef={videoRef}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
              />
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          {items.length > 1 && (
            <button
              onClick={() => paginate(1)}
              aria-label="Next"
              className="pointer-events-auto absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30
                w-10 h-10 rounded-full flex items-center justify-center
                bg-[#060818]/90 border border-indigo-500/25
                text-white/60 hover:text-white hover:bg-indigo-600/80
                backdrop-blur-sm transition-all duration-200
                shadow-[0_0_20px_rgba(99,102,241,0.2)]"
            >
              <HiChevronRight size={20} />
            </button>
          )}
        </div>

        {/* THUMBNAIL STRIP */}
        {items.length > 1 && (
          <div
            className="pointer-events-auto flex items-center justify-center gap-2
              px-5 py-3 border-t border-indigo-500/10 overflow-x-auto"
            style={{ background: 'rgba(6,8,24,0.92)', backdropFilter: 'blur(20px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((item, idx) => (
              <motion.button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`View item ${idx + 1}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden
                  border transition-all duration-300 ${
                    idx === index
                      ? 'border-indigo-400 opacity-100 shadow-[0_0_14px_rgba(129,140,248,0.45)]'
                      : 'border-indigo-500/15 opacity-40 hover:opacity-75 hover:border-indigo-500/35'
                  }`}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-900/50">
                    <MdPlayCircle size={16} className="text-indigo-300" />
                  </div>
                )}

                {/* Active pip */}
                {idx === index && (
                  <motion.div
                    layoutId="thumb-active"
                    className="absolute inset-0 rounded-lg border-2 border-indigo-400"
                  />
                )}
              </motion.button>
            ))}
          </div>
        )}

        {/* HINT */}
        <div
          className="pointer-events-none flex items-center justify-center py-2.5"
          style={{ background: 'rgba(6,8,24,0.92)' }}
        >
          <span className="text-[0.58rem] text-white/20 tracking-widest">
            ← → navigate · swipe · ESC to close · click outside to dismiss
          </span>
        </div>
      </motion.div>
    </>,
    document.body
  );
}

/* ─────────────────────────────────────────
   PROJECT CARD  (unchanged except Lightbox usage)
───────────────────────────────────────── */
function ProjectCard({ project }) {
  const hasImages = project.images?.filter(Boolean).length > 0;
  const hasVideo  = Boolean(project.video?.trim());
  const hasMedia  = hasImages || hasVideo;

  const mediaItems = [
    ...(project.images || [])
      .filter(Boolean)
      .map((src) => ({ type: 'image', src: normalizeSrc(src) })),
    ...(hasVideo ? [{ type: 'video', src: project.video }] : []),
  ];

  const [[activeIndex, slideDir], setActivePage] = useState([0, 0]);
  const [isPlaying, setIsPlaying]                = useState(false);
  const [lightboxOpen, setLightboxOpen]          = useState(false);
  const [lightboxStart, setLightboxStart]        = useState(0);
  const videoRef = useRef(null);

  const cardPaginate = useCallback((dir) => {
    setIsPlaying(false);
    setActivePage(([cur]) => {
      const next = (cur + dir + mediaItems.length) % mediaItems.length;
      return [next, dir];
    });
  }, [mediaItems.length]);

  const openLightbox = (idx) => {
    setLightboxStart(idx);
    setLightboxOpen(true);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else           { videoRef.current.play();  setIsPlaying(true);  }
  };

  const activeItem = mediaItems[activeIndex];

  /* Card slide variants — subtler than lightbox */
  const cardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 320, damping: 30 },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { type: 'spring', stiffness: 320, damping: 30 },
    }),
  };

  return (
    <>
      {lightboxOpen && (
        <Lightbox
          items={mediaItems}
          startIndex={lightboxStart}
          projectName={project.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div className="relative w-full rounded-2xl overflow-hidden
        bg-white/[0.025] border border-indigo-500/15 backdrop-blur-xl
        shadow-[0_0_40px_rgba(99,102,241,0.05),inset_0_1px_0_rgba(255,255,255,0.03)]
        hover:border-indigo-500/30 hover:shadow-[0_0_50px_rgba(99,102,241,0.1)]
        transition-all duration-500"
      >
        {/* Top gradient bar */}
        <div className="flex flex-row">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-500/50" />
          <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
        </div>

        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 relative">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            {project.featured && (
              <span className="px-2 py-0.5 rounded-full
                bg-indigo-500/15 border border-indigo-400/30
                text-[0.55rem] font-bold tracking-widest uppercase text-indigo-300">
                Featured
              </span>
            )}
            <p className="text-indigo-300 text-sm lg:text-base font-semibold tracking-wide
              truncate max-w-[200px] sm:max-w-xs text-center">
              {project.name}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            {project.code && (
              <Link href={project.code} target="_blank" rel="noopener noreferrer"
                aria-label="View source code"
                className="text-white/25 hover:text-indigo-400 transition-colors duration-200">
                <RiGithubLine size={15} />
              </Link>
            )}
            {project.demo && (
              <Link href={project.demo} target="_blank" rel="noopener noreferrer"
                aria-label="View live demo"
                className="text-white/25 hover:text-indigo-400 transition-colors duration-200">
                <RiExternalLinkLine size={14} />
              </Link>
            )}
          </div>
        </div>

        {/* MEDIA PANEL */}
        {hasMedia && (
          <div className="relative w-full border-t border-indigo-900/40 bg-[#060818] overflow-hidden">
            <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden">

              <AnimatePresence initial={false} custom={slideDir} mode="popLayout">
                <motion.div
                  key={activeIndex}
                  custom={slideDir}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) cardPaginate(1);
                    if (info.offset.x > 50)  cardPaginate(-1);
                  }}
                >
                  {activeItem?.type === 'image' ? (
                    <button
                      className="absolute inset-0 w-full h-full group cursor-zoom-in"
                      onClick={() => openLightbox(activeIndex)}
                      aria-label={`Expand ${project.name} screenshot`}
                    >
                      <img
                        src={activeItem.src}
                        alt={`${project.name} screenshot ${activeIndex + 1}`}
                        draggable={false}
                        className="w-full h-full object-cover object-top
                          group-hover:scale-[1.02] transition-transform duration-500 select-none"
                      />
                      <span className="absolute inset-0 flex items-center justify-center
                        bg-[#060818]/0 group-hover:bg-[#060818]/30 transition-all duration-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          px-3 py-1.5 rounded-full bg-[#060818]/80 border border-indigo-500/30
                          backdrop-blur-sm text-[0.6rem] font-bold tracking-widest uppercase text-indigo-300">
                          Click to expand
                        </span>
                      </span>
                    </button>
                  ) : isYoutube(activeItem?.src) ? (
                    <iframe
                      src={activeItem.src}
                      title={`${project.name} demo`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  ) : (
                    <button
                      className="absolute inset-0 w-full h-full group cursor-zoom-in"
                      onClick={() => openLightbox(activeIndex)}
                      aria-label={`Expand ${project.name} video`}
                    >
                      <video
                        ref={videoRef}
                        src={activeItem?.src}
                        loop playsInline muted
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute inset-0 flex items-center justify-center
                        bg-[#060818]/20 group-hover:bg-[#060818]/40 transition-all duration-300">
                        <MdPlayCircle size={52}
                          className="text-white/70 group-hover:text-white transition-colors duration-200 drop-shadow-lg" />
                      </span>
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16
                bg-gradient-to-t from-[#060818] to-transparent pointer-events-none z-20" />

              {/* Prev / Next */}
              {mediaItems.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); cardPaginate(-1); }}
                    aria-label="Previous"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30
                      w-8 h-8 rounded-full flex items-center justify-center
                      bg-[#060818]/80 border border-indigo-500/25
                      text-white/60 hover:text-white hover:bg-indigo-600/80
                      backdrop-blur-sm transition-all duration-200">
                    <HiChevronLeft size={17} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); cardPaginate(1); }}
                    aria-label="Next"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30
                      w-8 h-8 rounded-full flex items-center justify-center
                      bg-[#060818]/80 border border-indigo-500/25
                      text-white/60 hover:text-white hover:bg-indigo-600/80
                      backdrop-blur-sm transition-all duration-200">
                    <HiChevronRight size={17} />
                  </button>
                </>
              )}

              {/* Counter */}
              {mediaItems.length > 1 && (
                <div className="absolute top-3 left-3 z-30
                  px-2.5 py-1 rounded-full pointer-events-none
                  bg-[#060818]/80 border border-indigo-500/20 backdrop-blur-sm
                  text-[0.58rem] font-bold tracking-widest text-indigo-300/80 tabular-nums">
                  {activeIndex + 1} / {mediaItems.length}
                </div>
              )}

              {/* Video badge */}
              {activeItem?.type === 'video' && !isYoutube(activeItem?.src) && (
                <div className="absolute top-3 right-3 z-30 pointer-events-none
                  px-2.5 py-1 rounded-full
                  bg-[#060818]/80 border border-indigo-500/20 backdrop-blur-sm
                  text-[0.55rem] font-bold tracking-widest uppercase text-indigo-300/70">
                  Video
                </div>
              )}
            </div>

            {/* Dot strip */}
            {mediaItems.length > 1 && (
              <div className="flex items-center justify-center gap-2 px-4 pb-3 pt-1 z-30 relative">
                {mediaItems.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setIsPlaying(false);
                      setActivePage(([cur]) => [idx, idx > cur ? 1 : -1]);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    animate={{
                      width: idx === activeIndex ? 20 : 6,
                      background: idx === activeIndex ? '#818cf8' : 'rgba(255,255,255,0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="h-1.5 rounded-full cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TEXT PANEL */}
        <div className={`px-5 lg:px-8 py-6 lg:py-7 flex flex-col gap-5
          ${hasMedia ? '' : 'border-t border-indigo-900/40'}`}>
          <code className="font-mono text-xs md:text-sm leading-loose">
            <div className="blink">
              <span className="text-indigo-300">const </span>
              <span className="text-slate-200">project</span>
              <span className="text-indigo-300"> = </span>
              <span className="text-white/30">{'{'}</span>
            </div>
            <div>
              <span className="ml-4 text-slate-200">name: </span>
              <span className="text-white/30">'</span>
              <span className="text-indigo-200">{project.name}</span>
              <span className="text-white/30">',</span>
            </div>
            <div>
              <span className="ml-4 text-slate-200">role: </span>
              <span className="text-indigo-300">{project.role}</span>
              <span className="text-white/30">,</span>
            </div>
            <div className="ml-4">
              <span className="text-slate-200">description: </span>
              <span className="text-indigo-200/75 text-[0.72rem] leading-relaxed">
                {project.description}
              </span>
              <span className="text-white/30">,</span>
            </div>
            <div><span className="text-white/30">{'};'}</span></div>
          </code>

          {project.outcome && (
            <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl
              bg-indigo-500/6 border border-indigo-500/18">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              <p className="text-[0.72rem] font-semibold text-indigo-300/80 leading-relaxed">
                {project.outcome}
              </p>
            </div>
          )}

          
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
            {project.tools.map((tag, i) => (
              <span key={i}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
                  bg-indigo-500/7 border border-indigo-500/18
                  text-[0.58rem] font-semibold tracking-widest uppercase text-indigo-300/55">
                <BsCodeSlash size={7} />
                {tag}
              </span>
            ))}
          </div>

          {(project.code || project.demo) && (
            <div className="flex items-center gap-3 flex-wrap">
              {project.demo && (
                <Link href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                    bg-indigo-600 hover:bg-indigo-500 text-white
                    text-[0.65rem] font-bold tracking-widest uppercase
                    hover:shadow-[0_6px_18px_rgba(79,70,229,0.35)]
                    hover:-translate-y-px transition-all duration-200">
                  Live Demo <RiExternalLinkLine size={11} />
                </Link>
              )}
              {project.code && (
                <Link href={project.code} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                    bg-white/4 border border-indigo-500/20 text-white/60
                    text-[0.65rem] font-bold tracking-widest uppercase
                    hover:bg-indigo-500/10 hover:border-indigo-500/40 hover:text-white
                    transition-all duration-200">
                  Source <RiGithubLine size={12} />
                </Link>
              )}
            </div>
          )}

        </div>

        <div className="absolute bottom-0 left-0 w-8 h-8
          border-b border-l border-indigo-500/12 rounded-bl-2xl pointer-events-none" />
      </div>
    </>
  );
}

export default ProjectCard;