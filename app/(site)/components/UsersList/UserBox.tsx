"use client"

import { User } from "@prisma/client";
import React, { useCallback, useEffect, useState } from 'react';
import UserAvatar from "../Avatar/UserAvatar";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserBoxProps {
    user: User
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {

    const router = useRouter()

    const handler = useCallback(() => {

        console.log(user.id)
        axios.post("/api/conversation", {userId: user.id}).then(() => {
            router.push(`/v1/conversation/${user.id}`)
        })
    
    }, [user, router])


    return (
        <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-3" onClick={handler}>
            <div className="flex-shrink-0">

                <UserAvatar currentUser={user} marker={true} />

            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                    {user.email}
                </p>
            </div>
            <div className="inline-flex text-base font-semibold text-gray-900">
                
            </div>
        </div>
    )
}

export default UserBox;