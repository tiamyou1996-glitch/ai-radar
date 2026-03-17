import Link from "next/link";

import type { DailyIssue } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function Hero({ issue }: { issue: DailyIssue }) {
  return (
    <section className="px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pt-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:p-10">
          <div className="inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
            Daily Open Source Radar
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            每天自动整理
            <span className="block text-[var(--accent)]">值得关注的 AI GitHub 项目</span>
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{issue.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#today"
              className="inline-flex items-center rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            >
              查看今天的精选
            </Link>
            <Link
              href="/archive"
              className="inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              打开历史归档
            </Link>
          </div>
        </div>

        <aside className="rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Today&apos;s issue</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{formatDate(issue.date)}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{issue.headline}</p>
          <dl className="mt-6 space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <dt className="text-sm text-slate-500">精选项目</dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-900">{issue.projectCount}</dd>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <dt className="text-sm text-slate-500">生成时间</dt>
              <dd className="mt-2 text-lg font-semibold text-slate-900">{issue.generatedAt.slice(11, 16)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
