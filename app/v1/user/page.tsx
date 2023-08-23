
import EmptyState from "@/app/(site)/components/EmptyState/EmptyState"
import { signOut } from "next-auth/react"

export default function page (){
    return(
        <div className=" hidden lg:block lg:pl-80 h-full">
            <EmptyState />
        </div>
    )
}