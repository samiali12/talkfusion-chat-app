"use client"

import { User } from "@prisma/client";
import React, { useEffect, useState } from 'react';


interface UserAvatarProps {
    currentUser: any,
    marker: boolean
}


const UserAvatar: React.FC<UserAvatarProps> = ({ currentUser, marker }) => {


    return (

        <div className="relative">

            {
                currentUser.image ? (
                    <div>
                        <img
                           
                            src={currentUser?.image}
                            className={`w-10 h-10  rounded-full object-cover`}
                            alt="Avatar" />
                    </div>
                ) : (
                    <div>
                        <img
                            
                            src="https://norrismgmt.com/wp-content/uploads/2020/05/24-248253_user-profile-default-image-png-clipart-png-download.png"
                            className={`w-10 h-10 rounded-full object-cover`}
                            alt="Avatar" />
                    </div>
                )
            }

            {
                marker ? (
                    <span className="bg-green-500 h-3 w-3 absolute top-0 right-0 rounded-full" />
                ) : (

                    <span></span>
                )
            }


        </div>
    )
}

export default UserAvatar;