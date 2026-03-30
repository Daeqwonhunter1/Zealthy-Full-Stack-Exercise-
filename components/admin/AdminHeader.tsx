import Link from "next/link";

export default function AdminHeader() {
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400"
          />

        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage patients, providers, appointments, and prescriptions
          </p>
        </div>

        <Link
          href="/admin/patients/new"
          className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600"
        >
          Add a New Patient
        </Link>
      </div>


      <div className="mb-6 flex flex-wrap gap-3">
        <button className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-white shadow-sm">
          Patients
        </button>

        <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-500">
          Providers
        </button>

        <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-500">
          Nurses
        </button>

      </div>
    </>
  );
}