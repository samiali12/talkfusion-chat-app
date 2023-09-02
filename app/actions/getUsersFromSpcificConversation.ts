import getCurrentUser from "./getCurrentUser"

const getAllUsersofConversation = async (conversationList: any) => {

    const currentUser = getCurrentUser()

    const users = conversationList.map( (conversation: any) => {
        await getAllUsersofConversation({conversation.id}, currentUser)
    })

}