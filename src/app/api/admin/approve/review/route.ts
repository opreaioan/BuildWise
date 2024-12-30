import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    try {
        const { review_id, status } = await req.json();

        const updatedReview = await prisma.review.update({
            where: { idReview: review_id },
            data: { approved: status },
        });

        return NextResponse.json({ message: "Review approval updated", updatedReview });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}