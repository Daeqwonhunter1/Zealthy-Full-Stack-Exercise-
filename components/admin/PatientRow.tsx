import Link from "next/link";
import { PatientCardProps } from "@/types";

export default function PatientRow({ patient }: PatientCardProps) {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-sm font-semibold text-cyan-600">
            {patient.name.charAt(0)}
          </div>
          <span className="text-sm font-medium text-slate-700">
            {patient.name}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">{patient.email}</td>

      <td className="px-6 py-4 text-sm text-slate-500">
        {patient.appointments.length}
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">
        {patient.prescriptions.length}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/patients/${patient.id}/edit`}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Edit
          </Link>

          <Link
            href={`/admin/patients/${patient.id}`}
            className="rounded-lg bg-cyan-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-cyan-600"
          >
            View Record
          </Link>
        </div>
      </td>
    </tr>
  );
}