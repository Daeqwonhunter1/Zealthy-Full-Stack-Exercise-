"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PortalSidebarProps } from "@/types";

function navClass(isActive: boolean) {
  return isActive
    ? "rounded-xl bg-cyan-50 px-4 py-3 font-medium text-cyan-600"
    : "rounded-xl px-4 py-3 text-slate-500 transition hover:bg-slate-100";
}

export default function PortalSidebar({ active }: PortalSidebarProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await axios.post("/api/logout");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white px-6 py-8 lg:flex lg:flex-col">
      <div className="mb-10 text-2xl font-bold text-cyan-500">DH</div>

      <nav className="flex flex-col gap-2">
        <Link href="/portal" className={navClass(active === "portal")}>
          Portal
        </Link>

        <Link
          href="/portal/appointments"
          className={navClass(active === "appointments")}
        >
          Appointments
        </Link>

        <Link
          href="/portal/prescriptions"
          className={navClass(active === "prescriptions")}
        >
          Prescriptions
        </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-10">

        <Link
          href="/admin"
          className="rounded-xl px-4 py-3 text-slate-500 transition hover:bg-slate-100"
        >
          Admin
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl px-4 py-3 text-left text-slate-500 transition hover:bg-slate-100"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}