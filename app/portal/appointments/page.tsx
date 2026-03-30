import { redirect } from "next/navigation";
import Link from "next/link";
import PortalHeader from "@/components/portal/PortalHeader";
import PortalSidebar from "@/components/portal/PortalSidebar";
import { getLoggedInPatient } from "@/components/HelperFunctions";

export default async function PortalAppointmentsPage() {
  const patient = await getLoggedInPatient();

  if (!patient) {
    redirect("/");
  }

  const now = new Date();
  const next3Months = new Date();
  next3Months.setMonth(now.getMonth() + 3);

  const upcomingAppointments = patient.appointments.filter((appt) => {
    const date = new Date(appt.datetime);
    return date >= now && date <= next3Months;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <PortalSidebar active="appointments" />

        <section className="flex-1 px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <PortalHeader patientName={patient.name} />

            <div className="mb-6">
              <Link
                href="/portal"
                className="text-sm font-medium text-cyan-500 hover:text-cyan-600"
              >
                ← Back to Portal
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold text-slate-800">
                Upcoming Appointments
              </h2>

              {upcomingAppointments.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No upcoming appointments in the next 3 months.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-200 text-left">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Provider
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Datetime
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Repeat
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingAppointments.map((appt) => (
                        <tr key={appt.id} className="border-b border-slate-100">
                          <td className="px-4 py-4 text-sm text-slate-700">
                            {appt.provider}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-500">
                            {new Date(appt.datetime).toLocaleString()}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-500">
                            {appt.repeat}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}