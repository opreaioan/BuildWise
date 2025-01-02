import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const company_id = parseInt(url.searchParams.get("company_id") || "0", 10);

        const reviews = await prisma.review.findMany({
            where: {
                company_id,
                approved: 1, // Only fetch approved reviews
            },
            include: {
                User: { // Include User relation
                    select: {
                        username: true, 
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}