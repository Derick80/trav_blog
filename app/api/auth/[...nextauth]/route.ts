import NextAuth, { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export const Authoptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? ''
    })
  ],
  secret: process.env.NEXTAUTH_SECRET ?? ''
}

export const handler = NextAuth(Authoptions)

export { handler as GET, handler as POST }
