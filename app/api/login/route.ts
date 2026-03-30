import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { setPatientSession } from "@/lib/auth";
import { z } from "zod";


// Input Validation
const loginSchema = z.object({
  email: z.email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});



export async function POST(req: Request) {

    try {
        const body = await req.json();
        const parsed = loginSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: parsed.error.issues[0]?.message || "Invalid login data" },
                { status: 400 }
            );
        }

        const { email, password } = parsed.data;

        const patient = await db.patient.findUnique({
            where: { email },
        });

        if (!patient || patient.password !== password) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        await setPatientSession(patient.id);

        return NextResponse.json({
            success: true,
            patient: {
                id: patient.id,
                name: patient.name,
                email: patient.email,
            },
        });

    } catch (error) {
        console.error("LOGIN ROUTE ERROR:", error);

        return NextResponse.json(
            { message: "Failed to login"},
            { status: 500}
        );
    }
    
}