import { NextResponse } from "next/server";
import { db } from "@/lib/db";



export async function GET() {
    try {
        const patients = await db.patient.findMany({
            include: {
                appointments: true,
                prescriptions: true,
            },
            orderBy: {
                id: "asc",
            },
        });

        return NextResponse.json(patients);
    } catch (error) {
        console.error("GET /api/patients error:", error);

        return NextResponse.json(
            { message: "Failed to fetch patients"},
            { status: 500 }
        )
    }
}
