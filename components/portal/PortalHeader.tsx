"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { PatientNameProps } from "@/types";


export default function PortalHeader({ patientName }: PatientNameProps) {
  const router = useRouter();


  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome, {patientName}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View your upcoming appointments and prescription refills.
        </p>
      </div>


    </div>
  );
}