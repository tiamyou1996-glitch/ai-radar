import Link from "next/link";

import { getArchiveIndex } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "历史归档 | AI Radar",
  description: "查看 AI Radar 的历史日报归档。",
};

export default async function ArchivePage() {
  const archive = await getArchiveIndex();

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Archive</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">历史归档</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            每次定时任务生成后，都会沉淀成一份独立日报。等你把仓库推到 GitHub 并开启 Pages，这里就会每天自动增长。
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {archive.days.map((day) => (
            <Link
              key={day.date}
              href={`/archive/${day.date}`}
              className="block rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{formatDate(day.date)}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{day.headline}</p>
                </div>
                <div className="text-sm font-medium text-[var(--accent)]">{day.projectCount} 个项目</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
