"use client"

import { useState } from 'react'
import useRoutes from "@/app/hooks/useRoutes";
import DesktopSidebarItems from './DesktopSideItems';
import {PrismaClient} from 'prisma/prisma-client'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import UserAvatar from '../Avatar/UserAvatar';


const prisma = new PrismaClient()

interface DesktopSidebarProps {
    currentUser: any
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({currentUser}) => {

    const routes = useRoutes()
    const [isOpen, setOpen] = useState(null)

    return (
        <div className="hidden lg:flex flex-col justify-between lg:fixed lg:inset-y-0 lg:overflow-y-auto lg:bg-gray-50 lg:left-0 lg:w-20 lg:pb-4 lg:border-r-[1px]">
            <nav className="mt-4 flex justify-between items-center">
                <ul className="flex flex-col items-center w-20 space-y-6">
                    {
                        routes.map((items) =>
                            <DesktopSidebarItems
                                key={items.label}
                                label={items.label}
                                href={items.href}
                                icon={items.icon}
                                active={items.active}
                                onClick={items.onClick}
                            />
                        )
                    }
                </ul>
            </nav>

            <div className="flex justify-center items-center bg-red w-full">
                <div className="cursor-pointer">
                    <UserAvatar currentUser={currentUser}/>
                    </div>
               
            </div>
        </div>
    )
}

export default DesktopSidebar;