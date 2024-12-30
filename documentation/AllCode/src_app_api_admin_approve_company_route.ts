import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    try {
        const { company_id, status } = await req.json();

        const updatedApproval = await prisma.adminCompanyApproval.updateMany({
            where: { company_id },
            data: { status },
        });

        return NextResponse.json({ message: "Company approval updated", updatedApproval });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}