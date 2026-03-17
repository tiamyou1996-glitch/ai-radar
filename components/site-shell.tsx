import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
              AI
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">AI Radar</p>
              <p className="text-xs text-slate-500">每日 GitHub AI 开源项目雷达</p>
            </div>
          </Link>
          <nav className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-1 text-sm">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 font-medium text-slate-600 transition hover:bg-white hover:text-slate-900"
            >
              今日精选
            </Link>
            <Link
              href="/archive"
              className="rounded-lg px-3 py-2 font-medium text-slate-600 transition hover:bg-white hover:text-slate-900"
            >
              历史归档
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
