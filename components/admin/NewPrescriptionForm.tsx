"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type SubmitEvent } from "react";
import axios from "axios";
import { RxProps } from "@/types";

export default function NewPrescriptionForm({
  patientId,
  medications,
  dosages,
}: RxProps) {
  const router = useRouter();

  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [refillOn, setRefillOn] = useState("");
  const [refillSchedule, setRefillSchedule] = useState("monthly");
  const [refillEndsOn, setRefillEndsOn] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!medication && medications.length > 0) {
      setMedication(medications[0].name);
    }
  }, [medications, medication]);

  useEffect(() => {
    if (!dosage && dosages.length > 0) {
      setDosage(dosages[0].value);
    }
  }, [dosages, dosage]);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const payload = {
      patientId: Number(patientId),
      medication,
      dosage,
      quantity: Number(quantity),
      refillOn,
      refillSchedule,
      refillEndsOn: refillEndsOn || null,
    };


    try {
      await axios.post("/api/prescriptions", payload);
      router.push(`/admin/patients/${patientId}`);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to create prescription";
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
          Add Prescription
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Medication
            </label>
            <select
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-cyan-400 outline-none"
            >
              {medications.map((med) => (
                <option key={med.id} value={med.name}>
                  {med.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Dosage
            </label>
            <select
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-cyan-400 outline-none"
            >
              {dosages.map((dose) => (
                <option key={dose.id} value={dose.value}>
                  {dose.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Refill On
            </label>
            <input
              type="date"
              value={refillOn}
              onChange={(e) => setRefillOn(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Refill Schedule
            </label>
            <select
              value={refillSchedule}
              onChange={(e) => setRefillSchedule(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-cyan-400 outline-none"
            >
              <option value="monthly">Monthly</option>
              <option value="none">None</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Refill Ends On (optional)
            </label>
            <input
              type="date"
              value={refillEndsOn}
              onChange={(e) => setRefillEndsOn(e.target.value)}
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
              {loading ? "Creating..." : "Create Prescription"}
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