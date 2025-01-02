import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const {
            company_id,
            name,
            description,
            project_type,
            location,
            start_date,
            end_date,
            value,
        } = await req.json();

        const newProject = await prisma.project.create({
            data: {
                company_id,
                name,
                description,
                project_type,
                location,
                start_date: start_date ? new Date(start_date) : null,
                end_date: end_date ? new Date(end_date) : null,
                value,
            },
        });

        return NextResponse.json({ message: "Project added successfully", project: newProject }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}