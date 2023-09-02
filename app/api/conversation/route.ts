import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import { isWhiteSpaceSingleLine, transpileModule } from "typescript"

export async function POST(request: Request) {

    try {

        const currentUser = await getCurrentUser()
        const body = await request.json()
        const {
            userId,
            isGroup,
            memebers,
            name
        } = body

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("UnAnthorize ", { status: 500 })
        }

        if (isGroup && (!memebers || memebers.length < 2 || !name)) {
            return new NextResponse("Invalid data", { status: 500 })
        }

        if (isGroup) {
            const conversation = await prisma?.conversation.create(
                {
                    data: {
                        name,
                        isGroup,
                        userConversation: {
                            connect: [
                                ...memebers.map((memeber: { value: string }) => (
                                    { id: memeber.value }
                                )), {
                                    id: currentUser.id
                                }
                            ]
                        }
                    },
                    include: {
                        userConversation: true
                    }
                }
            )
            return NextResponse.json(conversation)
        }


        const existingConversation = await prisma?.conversation.findFirst({
            where: {
                userConversation: {
                    every: {
                        OR: [
                            {userId: currentUser.id},
                            {userId: userId}
                        ]
                    }
                }
            },
            include: {
                userConversation: true
            }
        })

        if (existingConversation) {
            const singleConversation: any = existingConversation
            if (singleConversation) {
                return NextResponse.json(singleConversation)
            }
        }


        const newConversation = await prisma?.conversation.create({
            data: {
                userConversation: {
                    createMany: {
                        data: [
                            { userId: currentUser.id },
                            { userId: userId }
                        ],
                    }
                }
            },
            include: {
                userConversation: true
            }
        })

        if (newConversation) {
            return NextResponse.json(newConversation)
        }

    }
    catch (error: any) {
        return new NextResponse("Internal server error", { status: 500 })
    }


}