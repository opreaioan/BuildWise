import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = context.params; // Access params correctly
    const companyId = parseInt(id);

    if (isNaN(companyId)) {
        return NextResponse.json({ message: "Invalid company ID" }, { status: 400 });
    }

    try {
        const company = await prisma.company.findUnique({
            where: { idCompany: companyId },
            include: {
                AdminCompanyApproval: true,
                Specialization: true,
                Project: true,
                Review: {
                    where: { approved: 1 },
                },
            },
        });

        if (!company) {
            return NextResponse.json({ message: "Company not found" }, { status: 404 });
        }

        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}