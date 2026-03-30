import Sidebar from "@/components/admin/Sidebar";
import EditAppointmentForm from "@/components/admin/EditAppointmentForm";
import { getPatient } from "@/components/HelperFunctions";

export default async function EditAppointmentPage({params,}: {params: Promise<{ id: string; appointmentId: string }>}) {
  const { id, appointmentId } = await params;
  const patient = await getPatient(id);
  const appointment = patient.appointments.find(
    (appt: any) => String(appt.id) === appointmentId
  );

  if (!appointment) {
    throw new Error("Appointment not found for this patient");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <section className="flex-1 px-4 py-6 sm:px-8 lg:px-10">
          <EditAppointmentForm appointment ={{
              ...appointment,
              patientId: patient.id,
            }} />
        </section>
      </div>
    </main>
  );
}