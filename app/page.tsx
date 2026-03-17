import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { getLatestIssue } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function Home() {
  const issue = await getLatestIssue();

  return (
    <main className="pb-20">
      <Hero issue={issue} />

      <section id="today" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Today&apos;s Picks</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                {formatDate(issue.date)} 的 AI 开源精选
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-500">
              这一版已经形成闭环：每天生成结构化数据，前端直接读取最新 issue、归档和项目详情。接下来就可以把自动更新放到 GitHub Actions 上稳定跑起来。
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {issue.projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
