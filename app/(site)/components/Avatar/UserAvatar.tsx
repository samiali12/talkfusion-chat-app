"use client"

import { User } from "@prisma/client";
import React, { useEffect, useState } from 'react';


interface UserAvatarProps {
    currentUser: User
}


const UserAvatar: React.FC<UserAvatarProps> = ({ currentUser }) => {

    const [avatarText, setAvatarText] = useState<String | null>()

    useEffect(() => {

        if (currentUser.name != null) {
            let name: string = currentUser.name
            let spaceIndex: number = name.indexOf(" ")

            let firstChar: string = name.charAt(0)
            if (spaceIndex !== -1 && spaceIndex < name.length - 1) {
                const characterAfterSpace: string = name[spaceIndex + 1];
                setAvatarText(firstChar + characterAfterSpace)
            } else {
                setAvatarText(firstChar)
            }

        }


    }, [currentUser, setAvatarText])

    return (

        <div className="relative">

            {
                currentUser.image ? (
                    <div>
                        <img
                            src={currentUser?.image}
                            className="w-10 h-10 rounded-full shadow-lg"
                            alt="Avatar" />
                    </div>
                ) : (
                    <div className="w-10 h-10 bg-[#007B83] p-1 text-white text-sm rounded-full shadow-lg">
                        <span>{avatarText}</span>
                    </div>
                )
            }

            <span className="bg-green-500 h-3 w-3 absolute top-0 right-0 rounded-full" />

        </div>
    )
}

export default UserAvatar;