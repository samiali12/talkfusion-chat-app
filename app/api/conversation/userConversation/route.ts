import getAllUsersofConversation from "@/app/actions/getAllUsersOfConversation"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"



export async function POST (request: Request){

    const currentUser = await getCurrentUser()
    const body = await request.json()
    const {
        conversationId
    } = body

    try{

        const conversation = await prisma.conversation.findUnique({

            where: {
                id: conversationId,
            },
            include: {
                userConversation: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!conversation) {
            return []
        }
    
        const users = conversation.userConversation
            .map((uc) => (uc.user)).filter((user) => user.email !==  currentUser?.email)
        
        return new NextResponse(JSON.stringify(users[0]),{status: 200})
    }
    catch(error: any){
        return new NextResponse("Error while getting conversation")
    }
    
}