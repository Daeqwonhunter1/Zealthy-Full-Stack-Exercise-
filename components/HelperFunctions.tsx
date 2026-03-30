import { getPatientSessionId } from "@/lib/auth";
import { Patient } from "@/types";
import axios from "axios";
import { db } from "@/lib/db";

export async function getPatient(id:string): Promise<Patient> {
    const response = await axios.get(`http://localhost:3000/api/patients/${id}`)

    if (response.status !== 200) {
        throw new Error("Failed to fetch patient");
    }

    return response.data;
}


export async function getPatients(): Promise<Patient[]> {
    const response = await axios.get("http://localhost:3000/api/patients")

    if (response.status !== 200) {
      throw new Error("Failed to fetch patients");
    }
    
    return response.data;
}


export async function getRxOptions() {
    const response = await axios.get("http://localhost:3000/api/options");

    if ( response.status !== 200) {
        throw new Error ("Failed to fetch rx options")
    }
    return response.data;
}


export async function getLoggedInPatient(){
    const patientId = await getPatientSessionId();
    
    if (!patientId) {
        return null;
    }

    const patient = await db.patient.findUnique({
        where: { id: patientId },
        include: {
            appointments: true,
            prescriptions: true,
        },
    });

  return patient;
}