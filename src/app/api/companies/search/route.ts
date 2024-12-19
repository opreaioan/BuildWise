import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "";

    const companies = await prisma.company.findMany({
      where: {
        name: { contains: query },
        // Only fetch companies that are approved
        AdminCompanyApproval: {
          some: { status: "approved" },
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