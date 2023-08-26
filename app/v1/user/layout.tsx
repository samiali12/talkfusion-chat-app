
import Sidebar from "@/app/(site)/components/Sidebar/Sidebar"
import UsersList from "@/app/(site)/components/UsersList/UsersList"
import getAllUsers from "@/app/actions/getAllUsers"

export default async function UserLayout({ children }: {
    children: React.ReactNode
}) {


    const userList = await getAllUsers()

    console.log(userList)
    
    return (
        <Sidebar>
            <div className="h-full">
                <UsersList userList={userList}/>
                {children}

            </div>
        </Sidebar>
    )
}