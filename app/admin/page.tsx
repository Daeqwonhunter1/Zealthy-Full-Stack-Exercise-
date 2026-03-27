import PatientCard from "@/components/PatientCard"
import { Patient } from "@/types"
import axios from "axios"



async function getPatients(): Promise<Patient[]> {
    const response = await axios.get("http://localhost:3000/api/patients")

    if (response.status !== 200) {
        throw new Error("Failed to fetch patients");
    }
    
    return response.data
}

export default async function Admin() {

    const patients = await getPatients();

    return (
    <main>
      <h1>Admin Page</h1>
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </main>
  );
}