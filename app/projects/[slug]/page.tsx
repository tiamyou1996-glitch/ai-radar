import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllProjectSlugs, getProjectBySlug } from "@/lib/data";
import { formatCompactNumber, formatDate, formatRelativeDate, scoreToLabel } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "项目未找到 | AI Radar" };
  }

  return {
    title: `${project.name} | AI Radar`,
    description: project.summaryZh,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
          <p className="text-sm font-medium text-slate-500">{project.owner}</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">{project.name}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{project.summaryZh}</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-5 py-4">
              <p className="text-sm text-slate-500">评级</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{scoreToLabel(project.totalScore)}</p>
              <p className="mt-1 text-sm text-[var(--accent)]">总分 {project.totalScore}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Stars" value={formatCompactNumber(project.stars)} />
            <Metric label="Forks" value={formatCompactNumber(project.forks)} />
            <Metric label="最近活跃" value={formatRelativeDate(project.pushedAt)} />
            <Metric label="语言" value={project.language ?? "Mixed"} />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[var(--border)] bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">为什么值得关注</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{project.whyItMatters}</p>

            <h3 className="mt-8 text-xl font-semibold text-slate-900">适合谁</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">{project.fitFor}</p>

            <h3 className="mt-8 text-xl font-semibold text-slate-900">仓库简介</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">{project.description}</p>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">项目信号</h2>
            <dl className="mt-6 space-y-5 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                <dt>首次收录日期</dt>
                <dd className="font-medium text-slate-900">{formatDate(project.featuredDate)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                <dt>创建时间</dt>
                <dd className="font-medium text-slate-900">{formatDate(project.createdAt)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                <dt>最近更新</dt>
                <dd className="font-medium text-slate-900">{formatDate(project.updatedAt)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                <dt>数据来源</dt>
                <dd className="font-medium text-slate-900">{project.source}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                <dt>Trend Score</dt>
                <dd className="font-medium text-slate-900">{project.trendScore}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                <dt>Quality Score</dt>
                <dd className="font-medium text-slate-900">{project.qualityScore}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt>Relevance Score</dt>
                <dd className="font-medium text-slate-900">{project.relevanceScore}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
              >
                打开 GitHub
              </a>
              {project.homepage ? (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--panel)] px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  官方主页
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
