import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        // Assume we get user ID from an authenticated session (replace with real auth)
        const userId = 1; // Replace with actual logged-in user ID

        const user = await prisma.user.findUnique({
            where: { idUser: userId },
            select: {
                idUser: true,
                username: true,
                email: true,
                role_id: true,
            },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}