import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <div className="max-w-xl rounded-3xl border border-[var(--border)] bg-white p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">项目不存在</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          这个项目详情页还没有被生成，先回到首页看看今天的精选项目。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
        >
          返回首页
        </Link>
      </div>
    </main>
  );
}
