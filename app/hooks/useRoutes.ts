import { useParams, usePathname } from "next/navigation"
import { useMemo } from 'react'
import useConversations from "./useConversations"
import {HiChat} from 'react-icons/hi'
import {HiUser, HiArrowLeftOnRectangle} from 'react-icons/hi2'
import { signOut } from "next-auth/react"

const useRoutes = () => {
    
    const currentPathName = usePathname()
    const {conversationsId }= useConversations()

    const routes = useMemo( () => [
        {
            label: 'Chat',
            href: 'convrsations',
            icon: HiChat,
            active: currentPathName === '/conversations' || !!conversationsId
        },
        {
            label: 'User',
            href: '/users',
            icon: HiUser,
            active: currentPathName === '/user',
        },
        {
            label: 'Logout',
            href: '#',
            icon: HiArrowLeftOnRectangle,
            onClick: () => signOut(),
        }
    ], [])

    return routes
}

export default useRoutes;