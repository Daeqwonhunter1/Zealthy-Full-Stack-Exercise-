import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const body = await req.json();
        console.log("BODY", body);

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            )
        }

        if(email && password){
            return NextResponse.json({
                success: true,
                user: {
                    id: 1,
                    name: "Test User",
                    email,
                },
            });
        }
    } catch (error) {
        console.error("LOGIN ROUTE ERROR:", error);

        return NextResponse.json(
            { success: false, message: "Server Error"},
            { status: 500}
        );
    }
    
}