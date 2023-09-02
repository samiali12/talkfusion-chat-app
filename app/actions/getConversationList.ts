import client from "../libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getConversationList = async () => {
   
    const currentUser = await getCurrentUser()
    if(!currentUser?.id){
        return []
    }

    try{
        const conversations = await client?.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userConversation: {
                    some: {
                        userId: currentUser.id
                    }
                }
            },
            include: {
                userConversation: true,
                messages: {
                    include: {
                        senderName: true,
                        seenMessage: true
                    }
                }
            }
        })

        if(conversations){
            return conversations
        }
    }
    catch(error: any){
        return []
    }

}

export default getConversationList;