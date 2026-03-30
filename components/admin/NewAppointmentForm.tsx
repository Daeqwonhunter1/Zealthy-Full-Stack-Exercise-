"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import axios from "axios";
import { PatientIdProps } from "@/types";

export default function NewAppointmentForm({ patientId }: PatientIdProps) {
  const router = useRouter();

  const [provider, setProvider] = useState("");
  const [datetime, setDatetime] = useState("");
  const [repeat, setRepeat] = useState("none");
  const [repeatEndsOn, setRepeatEndsOn] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await axios.post("/api/appointments", {
        patientId: Number(patientId),
        provider,
        datetime,
        repeat,
        repeatEndsOn: repeatEndsOn || null,
      });

      router.push(`/admin/patients/${patientId}`);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to create appointment";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href={`/admin/patients/${patientId}`}
          className="text-sm font-medium text-cyan-500 hover:text-cyan-600"
        >
          ← Back to Patient Record
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight text-slate-800">
          Add Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Provider Name
            </label>
            <input
              type="text"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Datetime
            </label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Repeat Schedule
            </label>
            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-cyan-400 outline-none"
            >
              <option value="none">None</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Repeat Ends On (optional)
            </label>
            <input
              type="date"
              value={repeatEndsOn}
              onChange={(e) => setRepeatEndsOn(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-cyan-400 outline-none"
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-600 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Appointment"}
            </button>

            <Link
              href={`/admin/patients/${patientId}`}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}