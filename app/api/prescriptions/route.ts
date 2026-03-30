import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { parseDateOnlyToLocal } from "@/lib/date";

// Prescription Input Validation
const prescriptionSchema = z.object({
  patientId: z.number(),
  medication: z.string().min(1, "Medication is required"),
  dosage: z.string().min(1, "Dosage is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  refillOn: z.string().min(1, "Refill date is required"),
  refillSchedule: z.enum(["monthly", "none"], {
    error: () => ({
      message: "Refill schedule must be monthly or none",
    }),
  }),
  refillEndsOn: z.string().nullable().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = prescriptionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message || "Invalid prescription data" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const prescription = await db.prescription.create({
      data: {
        patientId: data.patientId,
        medication: data.medication,
        dosage: data.dosage,
        quantity: data.quantity,
        refillOn: parseDateOnlyToLocal(data.refillOn),
        refillSchedule: data.refillSchedule,
        refillEndsOn: data.refillEndsOn ? parseDateOnlyToLocal(data.refillEndsOn) : null,
      },
    });

    return NextResponse.json(prescription, { status: 201 });
  } catch (error) {
    console.error("POST /api/prescriptions error:", error);

    return NextResponse.json(
      { message: "Failed to create prescription" },
      { status: 500 }
    );
  }
}