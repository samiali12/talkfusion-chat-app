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
            href: '/v1/conversations',
            icon: HiChat,
            active: currentPathName === '/v1/conversations' || !!conversationsId
        },
        {
            label: 'Users',
            href: '/v1/users',
            icon: HiUser,
            active: currentPathName === '/v1/users',
        },
        {
            label: 'Logout',
            href: '/v1/login',
            icon: HiArrowLeftOnRectangle,
            onClick: () => signOut(),
        }
    ], [])

    return routes
}

export default useRoutes;