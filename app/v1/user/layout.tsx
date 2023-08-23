"use client"

import Sidebar from "@/app/(site)/components/Sidebar/Sidebar"

export default async function UserLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <Sidebar>
            <div className="h-full">

                {children}

            </div>
        </Sidebar>
    )
}