import { useParams } from "next/navigation"
import { useMemo } from 'react'

const useConversations = () => {

    const params = useParams()

    const conversationsId = useMemo(() => {

        if (!params?.converationId) {
            return ''
        }
        return params.onversationsId as String

    }, [params])

    const isOpen = useMemo(() => { !!conversationsId }, [conversationsId])

    return useMemo(() => ({
        conversationsId,
        isOpen
    }), [conversationsId, isOpen])
}

export default useConversations;