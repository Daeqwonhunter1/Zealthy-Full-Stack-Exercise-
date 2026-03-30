import { NextResponse } from "next/server";
import { db } from "@/lib/db";


// Returns the list of medications and dosages from db
export async function GET() {
  try {
    const medications = await db.medication.findMany({
      orderBy: { name: "asc" },
    });

    const dosages = await db.dosage.findMany({
      orderBy: { value: "asc" },
    });

    return NextResponse.json({
      medications,
      dosages,
    });
  } catch (error) {
    console.error("GET /api/options error:", error);

    return NextResponse.json(
      { message: "Failed to fetch options" },
      { status: 500 }
    );
  }
}