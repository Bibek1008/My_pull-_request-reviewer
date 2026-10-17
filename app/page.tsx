/**
 * Public landing page for the Pull Request Reviewer product.
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 font-bold text-slate-950">
              C
            </div>
            <div>
              <div className="text-lg font-semibold">Pull Request Reviewer</div>
              <div className="text-xs text-slate-400">AI reviews for pull requests</div>
            </div>
          </div>

          <a
            href="/sign-in"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Sign in
          </a>
        </header>

        <section className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
              AI review pipeline powered by GitHub + vector search
            </div>

            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Review PRs with contextual AI feedback before merge.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Connect your GitHub app, inspect each pull request, and let the reviewer generate
              structured code review comments grounded in the diff and relevant repository context.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/sign-in"
                className="rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400"
              >
                Get started
              </a>
              <a
                href="/dashboard"
                className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Dashboard preview
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-violet-950/30">
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5">
              <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                <span>PR review status</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-300">Ready</span>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>bugfix/auth-flow</span>
                    <span className="text-emerald-300">Reviewed</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>feat/repo-sync</span>
                    <span className="text-cyan-300">Processing</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[52%] rounded-full bg-gradient-to-r from-cyan-400 to-sky-400" />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>perf/query-optimization</span>
                    <span className="text-amber-300">Pending</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[28%] rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            ["GitHub app integration", "Connect your workspace and automatically review opened, reopened, and updated pull requests."],
            ["Vector-backed context", "Combine the PR diff with relevant repository chunks to surface security, performance, and maintainability insights."],
            ["Actionable review comments", "Get structured, markdown-based feedback designed for quick merge decisions and faster fixes."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <div className="mb-4 h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20" />
              <h2 className="mb-2 text-lg font-semibold text-white">{title}</h2>
              <p className="text-sm leading-6 text-slate-300">{body}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
