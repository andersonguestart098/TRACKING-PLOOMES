import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@utils/prismaInstance"

export const authOptions = {  
  providers: [
    GoogleProvider({
      clientId: (process.env.GITHUB_ID as string),
      clientSecret: (process.env.GITHUB_SECRET as string)
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callback: {
    session: ({session, user}: any) => ({
        ...session,
        user: {
            ...session.user,
            id: user.id,
            username: user.username
        }
    })
  }
}

export default NextAuth(authOptions)