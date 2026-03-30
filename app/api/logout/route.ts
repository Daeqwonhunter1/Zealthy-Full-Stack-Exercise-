import { NextResponse } from "next/server";
import { clearPatientSession } from "@/lib/auth";


// Logs the user out
export async function POST() {
  try {
    await clearPatientSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/logout error:", error);

    return NextResponse.json(
      { message: "Failed to log out" },
      { status: 500 }
    );
  }
}