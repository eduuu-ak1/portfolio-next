"use client";

import Image from "next/image";

export default function ProjectCard({
  title,
  badge,
  description,
  tags,
  image,
  liveUrl,
  featured = false,
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-line bg-bg-alt ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-video w-full">
        <Image
          src={image}
          alt={title}
          fill
          priority={featured}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-bg via-bg/70 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="mb-2 w-fit rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
          {badge}
        </span>
        <h3 className="mb-2 font-display text-xl font-bold text-ink">
          {title}
        </h3>
        <p className="mb-3 text-base text-ink-soft line-clamp-3">{description}</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent px-3 py-1 font-mono text-xs text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit font-mono text-sm font-semibold text-accent underline underline-offset-4 hover:text-ink"
          >
            View Live &rarr;
          </a>
        )}
      </div>

      {/* Always-visible title for mobile / no-hover context */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg to-transparent p-4 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="font-display text-lg font-bold text-ink">
          {title}
        </h3>
      </div>
    </div>
  );
}