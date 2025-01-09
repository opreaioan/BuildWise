import {PrismaClient} from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface CustomJwtPayload extends jwt.JwtPayload {
    idUser: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const token = req.cookies.token; // Retrieve token from cookies

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Decode the token to get user data
        const decodedToken=jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;

        //Extract user ID from the decoded token
        const userId = decodedToken.idUser;

        // Fetch user data from the database
        const user = await prisma.user.findUnique({
            where: { idUser: userId },
            select: {
                username: true,
                email: true,
                Role: {
                    select: {
                        role_name: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            username: user.username,
            email: user.email,
            role: user.Role.role_name,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}