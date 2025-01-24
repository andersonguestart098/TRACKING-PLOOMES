import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@utils/prismaInstance";
import { Account } from "@prisma/client";

// Estendendo a tipagem do NextAuth para incluir accessToken e refreshToken na Session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string;
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.email " +
            "https://www.googleapis.com/auth/userinfo.profile " +
            "https://www.googleapis.com/auth/gmail.send " +
            "https://mail.google.com/", // Inclui o escopo para o Gmail SMTP
          access_type: "offline", // Necessário para obter o refresh token
          prompt: "consent", // Força o consentimento para obter o refresh token
        },
      },
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60, // Exemplo: Sessão válida por 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Busca a conta pelo provider e providerAccountId
        const dbAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (dbAccount) {
          console.log(`accessToken: ${dbAccount.access_token}`);
          console.log(`refreshToken: ${dbAccount.refresh_token}`);

          token.accessToken = dbAccount.access_token;
          token.refreshToken = dbAccount.refresh_token;

          // Atualiza o refreshToken se houver
          if (account.refresh_token) {
            console.log(
              `Updating refreshToken in database: ${account.refresh_token}`
            );

            await prisma.account.update({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
              data: { refresh_token: account.refresh_token },
            });
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub || "",
          accessToken:
            typeof token.accessToken === "string"
              ? token.accessToken
              : undefined,
          refreshToken:
            typeof token.refreshToken === "string"
              ? token.refreshToken
              : undefined,
          email: typeof token.email === "string" ? token.email : undefined,
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
