import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    // Check if the specialization already exists
    const existingSpecialization = await prisma.specialization.findUnique({
      where: { name },
    });

    if (existingSpecialization) {
      return NextResponse.json(
        { message: "Specialization already exists", specialization: existingSpecialization },
        { status: 409 }
      );
    }

    // Create a new specialization
    const newSpecialization = await prisma.specialization.create({
      data: { name },
    });

    return NextResponse.json(
      { message: "Specialization created successfully", specialization: newSpecialization },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
