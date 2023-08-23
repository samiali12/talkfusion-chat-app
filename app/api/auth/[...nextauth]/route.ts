
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt'

import Prisma from '@/app/libs/prismadb';

export const authOptions: AuthOptions = {

    adapter: PrismaAdapter(Prisma),

    providers: [
        CredentialProvider({
            // The name to display on the sign-in form (e.g., 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },
            authorize: async (credentials) => {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid Credentials");

                }

                const user = await Prisma.user.findUnique({
                    where: { email: credentials.email }
                
                })

                if (!user) {
                    throw new Error("Incorrect Email");

                } else {
                    if (user.hashedPassword) {
                        const isPasswordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
                        if (isPasswordMatch) {
                            return user;
                        } else {
                            throw new Error("Incorrect Password");
                        }
                    }


                }
            }
        })
    ],
    // Other configuration options
    debug: process.env.NODE_ENV === "production",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions)
export {handler as POST, handler as GET}