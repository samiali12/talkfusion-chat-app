import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const body = await request.json()

        const { email, password, fullName } = body;

        if (!fullName || !email || !password) {
            return new NextResponse('Missing info', { status: 401 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
       
        const name = fullName

        const user = await prisma.user.create({
            data: {
                name, email, hashedPassword
            }
        })
       
        return NextResponse.json(user)
    }
    catch(error){
        console.log(error)
    }
}