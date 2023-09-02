"use client"

import client from '@/app/libs/prismadb';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import UserAvatar from "../Avatar/UserAvatar";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ConversationBoxProps {
    conversation: any,
    currentUser: any
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ conversation, currentUser }) => {

    const [users, setUsers] = useState<any>()
    let [isLoading, setLoading] = useState<boolean>(true)


    useEffect(() => {

        async function fetchConversationUsers() {
            const response = await axios.post("/api/conversation/userConversation",
                { conversationId: conversation.id })

            if (response.data) {
                setLoading(false)
                setUsers(response.data)
            }
        }

        fetchConversationUsers()

    }, [])

    const lastMessage = useMemo( () => {
        const message = conversation.messages || []

        console.log(message)
        return conversation.messages[message.length-1]


    }, [conversation])

    const hasSeen = useMemo ( () => {
        if(lastMessage){
            return false
        }
    }, [lastMessage])


    const lastMessageTextOrBody = useMemo ( () => {
        if(lastMessage?.image){
            return 'Sent attachment'
        }
        if(lastMessage?.messageBody){
            return lastMessage.messageBody
        }
        return ''
    }, [lastMessage])

    return (


        isLoading ? (
            <div
                className="flex items-center justify-center animate-shimmer p-4">

                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>

            </div>
        ) : (
            <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-3" >
                <div className="flex-shrink-0">
                    <UserAvatar currentUser={users} marker={true} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {users.name}
                    </p>
                    <p className="text-sm font-semibold text-black truncate">
                        {
                            lastMessageTextOrBody? lastMessageTextOrBody : 'Start New Conversation'
                        }
                    </p>
                </div>
                <div className="inline-flex text-base font-semibold text-gray-900"></div>
            </div >
        )


    )
}

export default ConversationBox;