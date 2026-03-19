import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { getAllIssueDates, getIssueByDate } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ date: string }>;
}

export async function generateStaticParams() {
  const dates = await getAllIssueDates();
  return dates.map((date) => ({ date }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  const issue = await getIssueByDate(date);

  if (!issue) {
    return { title: "Archive Not Found | AI Radar" };
  }

  return {
    title: `${formatDate(issue.date)} | AI Radar Archive`,
    description: issue.summary,
  };
}

export default async function ArchiveDatePage({ params }: PageProps) {
  const { date } = await params;
  const issue = await getIssueByDate(date);

  if (!issue) {
    notFound();
  }

  return (
    <main className="pb-20">
      <Hero issue={issue} />

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Archive Issue</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                {formatDate(issue.date)} 的 AI 开源精选
              </h1>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-500">{issue.summary}</p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {issue.projects.map((project, index) => (
              <ProjectCard key={`${issue.date}-${project.slug}`} project={project} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
