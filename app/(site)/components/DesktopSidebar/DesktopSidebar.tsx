"use client"

import { useState } from 'react'
import useRoutes from "@/app/hooks/useRoutes";
import DesktopSidebarItems from './DesktopSideItems';


const DesktopSidebar = () => {

    const routes = useRoutes()
    const [isOpen, setOpen] = useState(null)

    return (
        <div className="hidden lg:flex flex-col justify-between lg:fixed lg:inset-y-0 lg:overflow-y-auto lg:bg-white-100 lg:left-0 lg:w-20 lg:pb-4 lg:border-r-[1px]">
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
        </div>
    )
}

export default DesktopSidebar;