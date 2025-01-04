import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Unauthorized: Missing or invalid token" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        let decodedToken: JwtPayload;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret");
            if (typeof decoded === "string") {
                return NextResponse.json(
                    { message: "Invalid token payload" },
                    { status: 403 }
                );
            }
            decodedToken = decoded as JwtPayload;
        } catch (error) {
            return NextResponse.json(
                { message: "Unauthorized: Invalid token" },
                { status: 403 }
            );
        }

        // Extract user ID from token payload
        const userId = decodedToken.id as number; // Ensure 'id' is present in the payload

        const user = await prisma.user.findUnique({
            where: { idUser: userId },
            select: {
                idUser: true,
                username: true,
                email: true,
                role_id: true,
                approved: true, // Include approval status
            },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (!user.approved) {
            return NextResponse.json(
                { message: "User pending approval" },
                { status: 403 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}