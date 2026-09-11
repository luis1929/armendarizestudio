import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

import { db } from '@/prisma/db'
import type { User } from '@/types/database'

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'correo@ejemplo.com' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials: Record<string, string | undefined> | undefined) {
        const user: User | null = await db.user.findFirst({
          where: {
            email: credentials?.email as string,
          },
        })

        if (!user || user.password !== (credentials?.password as string)) {
          throw new Error('Credenciales inválidas')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const GET = async (req: Request) => {
  return NextAuth(req, authOptions).handler(req)
}

export const POST = async (req: Request) => {
  return NextAuth(req, authOptions).handler(req)
}
