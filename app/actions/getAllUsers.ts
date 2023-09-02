import prisma from "../libs/prismadb"
import getSession from "./getSession"

const getAllUsers = async () => {

    try {
        const session = await getSession()

        if (!session?.user?.email) {
           
            return []
        }

        const users = await prisma.user?.findMany({
            orderBy: {
                createdAt: 'desc'
            },

            where: {
                NOT: {
                    email: session?.user?.email as string
                }
            }
        })

        if (!users) {
            return []
        }

        //console.log("List => " , users)
        return users
    }
    catch (error) {
        return []
    }

} 

export default getAllUsers;