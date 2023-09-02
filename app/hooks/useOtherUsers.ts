import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation: any | { users: User[] }) => {

    const session = useSession()

    const otherUsers = useMemo(() => {

        const currentUserEmail = session.data?.user?.email

        const allOtherUsers = conversation.userConversation.filter((user) => user.email !== currentUserEmail)

        return allOtherUsers;
    }, [session])

    return otherUsers
}

export default useOtherUser;