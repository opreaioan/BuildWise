import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } =await context.params; // Await the params promise
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
                    include:{
                        User: true,
                    }
                },
            },
        });

        if (!company) {
            return new Response("Company not found", { status: 404 });
        }

        return new Response(JSON.stringify(company), { status: 200 ,headers: {"Content-Type": "application/json"},});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}