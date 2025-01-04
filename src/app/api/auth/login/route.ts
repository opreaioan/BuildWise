import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.approved) {
      return NextResponse.json(
        { message: "User pending approval" },
        { status: 403 }
      );
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.idUser, email: user.email, role: user.role_id, approved: user.approved },
      process.env.JWT_SECRET || "default_jwt_secret",
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return success response with token
    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user.idUser,
          email: user.email,
          role: user.role_id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}