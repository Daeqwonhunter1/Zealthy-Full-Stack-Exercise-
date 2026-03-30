import Sidebar from "@/components/admin/Sidebar";
import NewAppointmentForm from "@/components/admin/NewAppointmentForm";

export default async function NewAppointmentPage({params,}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <section className="flex-1 px-4 py-6 sm:px-8 lg:px-10">
          <NewAppointmentForm patientId={id} />
        </section>
      </div>
    </main>
  );
}