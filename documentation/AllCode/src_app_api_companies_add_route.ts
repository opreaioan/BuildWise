import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      user_id,
      name,
      about,
      email,
      phone,
      website_url,
      adress,
      company_type,
      year_established,
      geographical_availability,
      social_media,
      specialization_id, // New required field
    } = await req.json();

    // Create a new company profile
    const newCompany = await prisma.company.create({
      data: {
        user_id,
        name,
        about,
        email,
        phone,
        website_url,
        adress,
        company_type,
        year_established,
        geographical_availability,
        social_media,
        specialization_id, // Linking specialization
      },
    });

    // Add an approval request entry
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