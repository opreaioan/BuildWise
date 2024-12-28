//Fetch All Specializations
//Create an endpoint to retrieve all existing specializations so users can choose from them.
//GET Method
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const specializations = await prisma.specialization.findMany();
    return NextResponse.json(specializations, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}