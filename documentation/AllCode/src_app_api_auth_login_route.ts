import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// Create a new Prisma client instance
const prisma = new PrismaClient();

// Define the handler function for the login route that will be called when the user submits the login form in the frontend 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
// Extract the email and password from the request body
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await prisma.user.findUnique({ where: { email } });
    // If the user does not exist or the password is incorrect, return an error response
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate a JWT token and set it as a cookie in the response header to authenticate the user
    const token = jwt.sign(
      { id: user.idUser, role: user.role_id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

      // Set the token as a cookie in the response header and return a success response with the user role
    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict`);
    return res.status(200).json({ message: "Login successful", role: user.role_id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}