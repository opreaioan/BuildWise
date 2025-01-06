import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, confirmPassword, username, role, adminCode } = await req.json();

    // Validate passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists. Please log in." },
        { status: 409 }
      );
    }

    // Check if admin code is valid (only for admin role)
    if(role === "admin" && adminCode !== process.env.ADMIN_SIGNUP_CODE) {
      return NextResponse.json(
        { message: "Invalid admin signup code" },
        { status: 403 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        role_id: role === "admin" ? 1 : role === "company" ? 2 : 3,
        username,
      },
    });

    // Add an entry to AdminUserApproval with status 'Pending'
    await prisma.adminUserApproval.create({
      data: {
        user_id: newUser.idUser,
        status: role === "admin" ? "approved" : "pending"
      },
    });

    return NextResponse.json(
      { message: role==="admin"? "Admin created successfully":"User pending admin approval", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user or approval entry:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}