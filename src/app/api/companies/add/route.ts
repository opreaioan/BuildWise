import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      name,
      about,
      email,
      phone,
      website_url,
      adress,
      user_id,
    } = await req.json();

    const newCompany = await prisma.company.create({
      data: {
        user_id,
        name,
        about,
        email,
        phone,
        website_url,
        adress,
      },
    });

    await prisma.adminCompanyApproval.create({
      data: {
        company_id: newCompany.idCompany,
        status: "pending",
      },
    });

    return NextResponse.json(
      { message: "Company profile submitted for approval", company: newCompany },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
