import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "../DesktopSidebar/DesktopSidebar";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import getSession from "@/app/actions/getSession";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Sidebar({ children }: { children: React.ReactNode }) {

   const session = getServerSession(authOptions)

   console.log(session)

    return (
        <div className="h-full">
            <MobileSidebar />
            <DesktopSidebar />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

