"use client"

import useConversations from "@/app/hooks/useConversations";
import { Conversation } from "@prisma/client";
import { useState } from "react";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
    initialItems: any,
    currentUser: any
}


const ConversationList : React.FC <ConversationListProps> = ({initialItems, currentUser}) => {

    const conversation = useConversations()

    const [items, setItems] = useState(initialItems)

    return (
        <div
            className="w-full lg:w-80 fixed lef-0 overflow-y-auto pb-20 px-4 py-4 lg:pb-8"
        >
            <div className="flex justify-between items-center mb-4 ">
                <h3 className="text-xl font-bold leading-none text-gray-700">Chats</h3>
            </div>

            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200">
                    <li className="py-3 sm:py-4">
                        {
                            items.length > 0 ? (
                                items.map( (user: any) => (
                                    <ConversationBox key={user.id} conversation={user} currentUser={currentUser}/>
                                ))
                            ) : (
                                <h3 className="text-center text-base font-normal leading-none text-gray-400">No Chat Found</h3>

                            )
                             
                        }
                        
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ConversationList;