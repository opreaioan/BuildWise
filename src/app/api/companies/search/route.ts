import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const query = url.searchParams.get("query") || "";

        // Fetch companies linked to AdminCompanyApproval with status "approved"
        const companies = await prisma.company.findMany({
            where: {
                AdminCompanyApproval: {
                    some: {
                        status: "approved",
                    },
                },
                name: {
                    contains: query
                },
            },
            include: {
                AdminCompanyApproval: true,
            },
        });

        return NextResponse.json(companies, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}