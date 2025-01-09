import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// GET handler for session validation
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value; // Extract the token from cookies

    if (!token) {
      console.error("No token found in cookies");
      return NextResponse.json(
        { message: "Unauthorized: No token provided." },
        { status: 401 }
      );
    }

    console.log("Token found:", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded token:", decoded);

    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { message: "Unauthorized: Invalid or expired token." },
      { status: 401 }
    );
  }
}