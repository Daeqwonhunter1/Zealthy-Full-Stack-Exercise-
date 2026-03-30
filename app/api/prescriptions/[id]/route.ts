import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { parseDateOnlyToLocal } from "@/lib/date";

// Input Validation
const prescriptionUpdateSchema = z.object({
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
});

// 
export async function PUT(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const prescriptionId = Number(id);

    if (!prescriptionId || Number.isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid prescription id" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = prescriptionUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            parsed.error.issues[0]?.message || "Invalid prescription data",
          errors: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updatedPrescription = await db.prescription.update({
      where: { id: prescriptionId },
      data: {
        medication: data.medication,
        dosage: data.dosage,
        quantity: data.quantity,
        refillOn: parseDateOnlyToLocal(data.refillOn),
        refillSchedule: data.refillSchedule,
        refillEndsOn: data.refillEndsOn ? parseDateOnlyToLocal(data.refillEndsOn) : null,
      },
    });

    return NextResponse.json(updatedPrescription);
  } catch (error) {
    console.error("PUT /api/prescriptions/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to update prescription" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const prescriptionId = Number(id);

    if (!prescriptionId || Number.isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid prescription id" },
        { status: 400 }
      );
    }

    await db.prescription.delete({
      where: { id: prescriptionId },
    });

    return NextResponse.json({ message: "Prescription deleted" });
  } catch (error) {
    console.error("DELETE /api/prescriptions/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to delete prescription" },
      { status: 500 }
    );
  }
}