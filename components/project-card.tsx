import Link from "next/link";

import type { Project } from "@/lib/types";
import { formatCompactNumber, formatRelativeDate, scoreToLabel } from "@/lib/utils";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article
      className={`rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] ${
        priority ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{project.owner}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{project.name}</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {scoreToLabel(project.totalScore)}
        </span>
      </div>

      <p className="mt-4 text-base leading-7 text-slate-700">{project.summaryZh}</p>
      <p className="mt-3 text-sm leading-7 text-slate-500">{project.whyItMatters}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 border-t border-[var(--border)] pt-5 text-sm sm:grid-cols-3">
        <div>
          <p className="text-slate-500">Stars</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{formatCompactNumber(project.stars)}</p>
        </div>
        <div>
          <p className="text-slate-500">最近活跃</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{formatRelativeDate(project.pushedAt)}</p>
        </div>
        <div>
          <p className="text-slate-500">语言</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{project.language ?? "Mixed"}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
        >
          查看详情
        </Link>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--panel)] px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white"
        >
          GitHub
        </a>
      </div>
    </article>
  );
}
