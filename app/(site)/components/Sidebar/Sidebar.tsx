
import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "../DesktopSidebar/DesktopSidebar";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import React from "react";
import { useSession } from "next-auth/react";


async function Sidebar({ children }: { children: React.ReactNode }) {


    const currentUser = await getCurrentUser()
    
    return (
        <div className="h-full">
            <MobileSidebar />
            <DesktopSidebar  currentUser={currentUser} />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}


export default Sidebar;