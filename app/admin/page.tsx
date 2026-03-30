import { Patient } from "@/types"
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import PatientTable from "@/components/admin/PatientTable";
import axios from "axios"



async function getPatients(): Promise<Patient[]> {

    // Uses axios to get all Patients 
    const response = await axios.get("http://localhost:3000/api/patients")

    // If the response status is not 200 then throw an Error 
    if (response.status !== 200) {
      throw new Error("Failed to fetch patients");
    }
    
    return response.data
}


export default async function Admin() {

    const patients = await getPatients();

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