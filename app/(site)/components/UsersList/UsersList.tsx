import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
    userList: User[]
}


const UsersList: React.FC<UserListProps> = ({userList}) => {
    return (
        <div
            className="w-full lg:w-80 fixed lef-0 overflow-y-auto pb-20 px-4 py-4 lg:pb-8"
        >
            <div className="flex justify-between items-center mb-4 ">
                <h3 className="text-xl font-bold leading-none text-gray-700">Chats</h3>

            </div>

            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200">
                    <li className="py-3 sm:py-4">
                        {
                            userList.length > 0 ? (
                                userList.map( (user) => (
                                    <UserBox key={user.id}/>
                                ))
                            ) : (
                                <h3 className="text-center text-base font-normal leading-none text-gray-400">No Chat Found</h3>

                            )
                             
                        }
                        
                    </li>
                </ul>
            </div>


        </div>
    )
}

export default UsersList;