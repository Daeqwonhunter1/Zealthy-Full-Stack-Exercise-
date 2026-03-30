import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const appointmentSchema = z.object({
  patientId: z.number(),
  provider: z.string().min(1, "Provider is required"),
  datetime: z.string().min(1, "Datetime is required"),
  repeat: z.enum(["none", "weekly", "monthly"], {
    error: () => ({ message: "Repeat must be none, weekly, or monthly" }),
  }),
  repeatEndsOn: z.string().nullable().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = appointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message || "Invalid appointment data" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const appointment = await db.appointment.create({
      data: {
        patientId: data.patientId,
        provider: data.provider,
        datetime: new Date(data.datetime),
        repeat: data.repeat,
        repeatEndsOn: data.repeatEndsOn ? new Date(data.repeatEndsOn) : null,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("POST /api/appointments error:", error);

    return NextResponse.json(
      { message: "Failed to create appointment" },
      { status: 500 }
    );
  }
}