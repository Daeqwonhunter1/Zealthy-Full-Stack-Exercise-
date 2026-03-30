import Link from "next/link";
import { PatientCardProps } from "@/types";

export default function PatientDetailCard({ patient }: PatientCardProps) {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400"
          />

        </div>

      </div>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-2">
            <Link
              href="/admin"
              className="text-sm font-medium text-cyan-500 hover:text-cyan-600"
            >
              ← Back to Patient&apos;s List
            </Link>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Patients - {patient.name}
          </h1>
        </div>

        
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-white shadow-sm">
          Summary
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Prescriptions
            </h2>

            <Link
                href={`/admin/patients/${patient.id}/prescriptions/new`}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600"
                >
                Add Prescription
            </Link>
          </div>

          {patient.prescriptions.length === 0 ? (
            <p className="text-sm text-slate-500">No prescriptions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Medication
                    </th>
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Dosage
                    </th>
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Quantity
                    </th>
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Refill On
                    </th>
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patient.prescriptions.map((rx) => (
                    <tr
                      key={rx.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-3 py-4 text-sm text-slate-700">
                        {rx.medication}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500">
                        {rx.dosage}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500">
                        {rx.quantity}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500">
                        {new Date(rx.refillOn).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                            <Link href={`/admin/patients/${patient.id}/prescriptions/${rx.id}/edit`}>
                              Edit
                            </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Appointments
            </h2>

            <Link
                href={`/admin/patients/${patient.id}/appointments/new`}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600"
                >
                Add Appointment
            </Link>
          </div>

          {patient.appointments.length === 0 ? (
            <p className="text-sm text-slate-500">No appointments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Provider
                    </th>
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Datetime
                    </th>
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Repeat
                    </th>
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patient.appointments.map((appt) => (
                    <tr
                      key={appt.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-3 py-4 text-sm text-slate-700">
                        {appt.provider}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500">
                        {new Date(appt.datetime).toLocaleString()}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500">
                        {appt.repeat}
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                            <Link href={`/admin/patients/${patient.id}/appointments/${appt.id}/edit`}>
                              Edit
                            </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}