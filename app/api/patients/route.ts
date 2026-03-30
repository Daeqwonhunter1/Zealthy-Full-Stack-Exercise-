import { NextResponse } from "next/server";
import { db } from "@/lib/db";


// GET REQ - Returns a list of patients 
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

// POST REQ - Creates a new patient
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email, and password are required"},
                { status: 400}
            );
        }

        const existingPatient = await db.patient.findUnique({
            where: { email },
        });

        if (existingPatient) {
            return NextResponse.json(
                { message: "A patient with this email already exists" },
                { status: 409 }
            )
        }

        const patient = await db.patient.create({
            data: {
                name,
                email,
                password,
            },
            include: {
                appointments: true,
                prescriptions: true,
            },
        });

        return NextResponse.json(patient, { status: 201 });
        
    }catch(err) {
        console.error("POST /api/patients error:", err)

        return NextResponse.json(
            { message: "Failed to create a Patient"},
            { status: 500 }
        )
    }

}