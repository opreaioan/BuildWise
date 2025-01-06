import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {

        const pendingUsers = await prisma.adminUserApproval.findMany({
            where: { status: "pending" },
            include: { User: true },
        });

        const pendingCompanies = await prisma.adminCompanyApproval.findMany({
            where: { status: "pending" },
            include: { Company: true },
        });

        const pendingReviews = await prisma.adminReviewApproval.findMany({
            where: { status: "pending" },
            include: { Review: true },
        });

        return NextResponse.json({ pendingUsers, pendingCompanies, pendingReviews });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}