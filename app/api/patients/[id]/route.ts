import { NextResponse } from "next/server";
import { db } from "@/lib/db";


// GET Request - Finds a patient by ID and returns to user 
export async function GET(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const patientId = Number(id);

    if (!id || Number.isNaN(patientId)) {
      return NextResponse.json(
        { message: "Invalid patient id" },
        { status: 400 }
      );
    }

    const patient = await db.patient.findUnique({
      where: { id: patientId },
      include: {
        appointments: true,
        prescriptions: true,
      },
    });

    if (!patient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("GET /api/patients/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}


// Finds User by Id, replaces requested fields 
export async function PUT(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const patientId = Number(id);

    if (!id || Number.isNaN(patientId)) {
      return NextResponse.json(
        { message: "Invalid patient id" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingPatient = await db.patient.findUnique({
      where: { id: patientId },
    });

    if (!existingPatient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }

    const emailTaken = await db.patient.findFirst({
      where: {
        email,
        NOT: {
          id: patientId,
        },
      },
    });

    if (emailTaken) {
      return NextResponse.json(
        { message: "Another patient already uses this email" },
        { status: 409 }
      );
    }

    const updatedPatient = await db.patient.update({
      where: { id: patientId },
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

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("PUT /api/patients/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to update patient" },
      { status: 500 }
    );
  }
}