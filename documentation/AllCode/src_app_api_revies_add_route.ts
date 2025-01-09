import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { client_id, company_id, rating, review_text } = await req.json();

        const newReview = await prisma.review.create({
            data: {
                client_id,
                company_id,
                rating,
                review_text,
                approved: 0, // Pending admin approval
            },
        });

        return NextResponse.json({ message: "Review submitted successfully", review: newReview }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}