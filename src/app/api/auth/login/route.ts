// Handles user login. Verifies credentials, checks approval status,
// generates a JWT, and sets it in a secure cookie.

import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client"; // Ensure prisma client is properly imported
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      include: { AdminUserApproval: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify password
    const isPasswordValid = bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Check approval status
    const approvalStatus = user.AdminUserApproval[0]?.status || "pending";
    if (approvalStatus !== "approved") {
      return NextResponse.json({
        message: `Login failed: Your account is ${approvalStatus}. Please contact the administrator.`,
      }, { status: 403 });
    }

    // Create JWT
    const token = jwt.sign(
      {
        idUser: user.idUser,
        role_id: user.role_id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Set cookie
    const response = NextResponse.json({ message: "Login successful", token });
    response.cookies.set("auth_token", token, {
      httpOnly: true, // Prevent client-side JavaScript from accessing this cookie (XSS attacks) being only accessible by the server
      secure: process.env.NODE_ENV === "production", // Sets to true if NODE_ENV === production, otherwise it's set to false
      sameSite: "strict", // Prevent CSRF (Cross-Site Request Forgery) attacks, thus only allowing requests from the same site
      maxAge: 10800, // 3 hours
      path: "/", // Cookie is valid across all paths in the app
    });
    console.log("TokenBody: ", token);
    console.log("CookieBody: ", response.cookies.get("auth_token"));
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}