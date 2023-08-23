import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {

        const body = await request.json()

        const { email, password } = body

        if (!email || !password) {
            return new NextResponse("Info is missing", { status: 501 })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (user !== null) {
            if (user.hashedPassword !== null) {
                const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

                if (isPasswordMatch) {
                    return new NextResponse("User Login Successfully", {status: 200})
                } else {
                    return new NextResponse("Invalid Password", {status: 401})
                }
            }
        }
        else {
            console.log("Email is incorrect")
            return new NextResponse("User not found with this email", {status: 404})
        }

    } catch (error) {
        console.log("Internel Srver Error: ", error)
        return new NextResponse("Internel Srver Error", {status: 501})
    }
}