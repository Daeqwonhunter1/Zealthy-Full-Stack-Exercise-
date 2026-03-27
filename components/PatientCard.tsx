import { PatientCardProps } from "@/types";

export default function PatientCard({ patient }: PatientCardProps) {
    return (
        <div>
            <h2>{patient.name}</h2>
            <p>{patient.email}</p>
        </div>
    )
}