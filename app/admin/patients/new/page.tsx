import Sidebar from "@/components/admin/Sidebar";
import NewPatientForm from "@/components/admin/NewPatientForm";

export default function NewPatientPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />

        <section className="flex-1 px-4 py-6 sm:px-8 lg:px-10">
          <NewPatientForm />
        </section>
      </div>
    </main>
  );
}