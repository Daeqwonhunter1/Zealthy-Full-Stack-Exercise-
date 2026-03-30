import Link from "next/link";
import { redirect } from "next/navigation";
import PortalHeader from "@/components/portal/PortalHeader";
import PortalSidebar from "@/components/portal/PortalSidebar";
import { getLoggedInPatient } from "@/components/HelperFunctions";

export default async function PortalPage() {
  const patient = await getLoggedInPatient();

  if (!patient) {
    redirect("/");
  }

  const now = new Date();
  const next7Days = new Date();
  next7Days.setDate(now.getDate() + 7);

  const upcomingAppointments = patient.appointments.filter((appt) => {
    const date = new Date(appt.datetime);
    return date >= now && date <= next7Days;
  });

  const upcomingRefills = patient.prescriptions.filter((rx) => {
    const date = new Date(rx.refillOn);
    return date >= now && date <= next7Days;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <PortalSidebar active="portal" />

        <section className="flex-1 px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <PortalHeader patientName={patient.name} />

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-lg font-semibold text-slate-800">
                  Patient Info
                </h2>
                <p className="text-sm text-slate-600">
                  <strong>Name:</strong> {patient.name}
                </p>
                <p className="text-sm text-slate-600">
                  <strong>Email:</strong> {patient.email}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-lg font-semibold text-slate-800">
                  Appointments in Next 7 Days
                </h2>
                <p className="text-3xl font-bold text-cyan-500">
                  {upcomingAppointments.length}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-lg font-semibold text-slate-800">
                  Refills in Next 7 Days
                </h2>
                <p className="text-3xl font-bold text-cyan-500">
                  {upcomingRefills.length}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Upcoming Appointments
                  </h2>
                  <Link
                    href="/portal/appointments"
                    className="text-sm font-medium text-cyan-500 hover:text-cyan-600"
                  >
                    View all
                  </Link>
                </div>

                {upcomingAppointments.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No upcoming appointments in the next 7 days.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {upcomingAppointments.map((appt) => (
                      <li
                        key={appt.id}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <p className="text-sm font-medium text-slate-700">
                          {appt.provider}
                        </p>
                        <p className="text-sm text-slate-500">
                          {new Date(appt.datetime).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Upcoming Refills
                  </h2>
                  <Link
                    href="/portal/prescriptions"
                    className="text-sm font-medium text-cyan-500 hover:text-cyan-600"
                  >
                    View all
                  </Link>
                </div>

                {upcomingRefills.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No medication refills in the next 7 days.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {upcomingRefills.map((rx) => (
                      <li
                        key={rx.id}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <p className="text-sm font-medium text-slate-700">
                          {rx.medication} - {rx.dosage}
                        </p>
                        <p className="text-sm text-slate-500">
                          Refill on {new Date(rx.refillOn).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}