export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white px-6 py-8 lg:flex lg:flex-col">
      <div className="mb-10 text-2xl font-bold text-cyan-500">DH</div>

      <nav className="flex flex-col gap-2">
        <a
          href="/admin"
          className="rounded-xl bg-cyan-50 px-4 py-3 font-medium text-cyan-600"
        >
          Users
        </a>

      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-10">
        <a
          href="/"
          className="rounded-xl px-4 py-3 text-slate-500 transition hover:bg-slate-100"
        >
          Sign In
        </a>

      </div>
    </aside>
  );
}