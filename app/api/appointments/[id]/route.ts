import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Input Validation
const appointmentUpdateSchema = z.object({
  provider: z.string().min(1, "Provider is required"),
  datetime: z.string().min(1, "Datetime is required"),
  repeat: z.enum(["none", "weekly", "monthly"], {
    error: () => ({ message: "Repeat must be none, weekly, or monthly" }),
  }),
  repeatEndsOn: z.string().nullable().optional(),
});

export async function PUT(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const appointmentId = Number(id);

    if (!appointmentId || Number.isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid appointment id" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = appointmentUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: parsed.error.issues[0]?.message || "Invalid appointment data",
          errors: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;


    const updatedAppointment = await db.appointment.update({
      where: { id: appointmentId },
      data: {
        provider: data.provider,
        datetime: new Date(data.datetime),
        repeat: data.repeat,
        repeatEndsOn: data.repeatEndsOn ? new Date(data.repeatEndsOn) : null,
      },
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error("PUT /api/appointments/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const appointmentId = Number(id);

    if (!appointmentId || Number.isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid appointment id" },
        { status: 400 }
      );
    }

    await db.appointment.delete({
      where: { id: appointmentId },
    });

    return NextResponse.json({ message: "Appointment deleted" });
  } catch (error) {
    console.error("DELETE /api/appointments/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}