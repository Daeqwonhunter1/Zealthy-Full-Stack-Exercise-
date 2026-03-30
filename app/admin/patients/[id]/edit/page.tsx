import Sidebar from "@/components/admin/Sidebar";
import EditPatientForm from "@/components/admin/EditPatientForm";
import { getPatient } from "@/components/HelperFunctions";

export default async function EditPatientPage({ params, }: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const patient = await getPatient(id);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <section className="flex-1 px-4 py-6 sm:px-8 lg:px-10">
          <EditPatientForm patient={patient} />
        </section>
      </div>
    </main>
  );
}