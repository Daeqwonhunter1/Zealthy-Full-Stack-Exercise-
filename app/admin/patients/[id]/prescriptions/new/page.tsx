import Sidebar from "@/components/admin/Sidebar";
import NewPrescriptionForm from "@/components/admin/NewPrescriptionForm";
import { getRxOptions } from "@/components/HelperFunctions";

export default async function NewPrescriptionPage({params,}: {params: Promise<{ id: string; prescriptionId: string }>}) {
  const { id } = await params;
  const rxOptions = await getRxOptions();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <section className="flex-1 px-4 py-6 sm:px-8 lg:px-10">
          <NewPrescriptionForm patientId={id} medications={rxOptions.medications} dosages={rxOptions.dosages} />
        </section>
      </div>
    </main>
  );
}