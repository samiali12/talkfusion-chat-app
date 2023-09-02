import Sidebar from "@/app/(site)/components/Sidebar/Sidebar";
import ConversationList from "@/app/(site)/components/conversationList/ConversationList";
import getAllUsersofConversation from "@/app/actions/getAllUsersOfConversation";
import getConversationList from "@/app/actions/getConversationList";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ReactNode } from "react";

export default async function ConversationLayout({children}: {children: React.ReactNode}){

    const conversationsList = await getConversationList()
    const currentUser = await getCurrentUser()

    console.log(conversationsList)
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversationsList} currentUser={currentUser} />
                {children}
            </div>
        </Sidebar>
    )
}