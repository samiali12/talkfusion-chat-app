import {useSession } from "next-auth/react";
import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import getSession from './getSession';
import { User } from "@prisma/client";

export default async function getAllUsersofConversation(conversationId: string) {

    const session = await getCurrentUser()


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
        .map((uc) => (uc.user)).filter((user) => user.email !== session.email)
    
    return users[0];
}
