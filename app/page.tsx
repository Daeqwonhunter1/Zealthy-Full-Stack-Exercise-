import PatientLoginForm from "@/components/portal/PatientLoginForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Patient Portal
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to view appointments, prescriptions, and your patient info.
          </p>
        </div>

        <PatientLoginForm />
      </div>
    </main>
  );
}