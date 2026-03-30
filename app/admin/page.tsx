import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import PatientTable from "@/components/admin/PatientTable";
import { getPatientsFromDb } from "@/components/HelperFunctions";


export default async function Admin() {

    const patients = await getPatientsFromDb();

    return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />

        <section className="flex-1 px-4 py-6 sm:px-8 lg:px-10">
          <AdminHeader />
          <PatientTable patients={patients} />
        </section>
      </div>
    </main>
  );
}