import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const pendingCompanies = await prisma.adminCompanyApproval.findMany({
            where: { status: "pending" },
            include: { Company: true },
        });

        const pendingReviews = await prisma.review.findMany({
            where: { approved: 0 },
            include: { Company: true },
        });

        return NextResponse.json({ pendingCompanies, pendingReviews });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}