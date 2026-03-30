import Sidebar from "@/components/admin/Sidebar";
import EditPrescriptionForm from "@/components/admin/EditPrescriptionForm";
import { getPatient, getRxOptions } from "@/components/HelperFunctions";

export default async function EditPrescriptionPage({params}: {params: Promise<{ id: string; prescriptionId: string }>}) {
  const { id, prescriptionId } = await params;
  const rxOptions = await getRxOptions();
  const patient = await getPatient(id);
  const prescription = patient.prescriptions.find(
    (rx: any) => String(rx.id) === prescriptionId
  );

  if (!prescription) {
    throw new Error("Prescription not found for this patient");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <section className="flex-1 px-4 py-6 sm:px-8 lg:px-10">
          <EditPrescriptionForm 
            prescription ={{
              ...prescription,
              patientId: patient.id,
            }} 
            medications={rxOptions.medications} 
            dosages={rxOptions.dosages} />
        </section>
      </div>
    </main>
  );
}