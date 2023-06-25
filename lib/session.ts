import { SessionInterface, UserProfile } from '@/common.types';
import jsonwebtoken from 'jsonwebtoken';
import { NextAuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { createUser, getUser } from './actions';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  jwt: {
    encode: async ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: 'https://grafbase.com',
          iat: Date.now() / 1000,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret,
        { algorithm: 'HS512' }
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret, {
        algorithms: ['HS512'],
      }) as JWT;
      return decodedToken;
    },
  },

  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUser(email)) as { user?: UserProfile };
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error: any) {
        return session;
        // throw new Error(error);
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        console.log('hit');
        const userExists = (await getUser(user.email!)) as { user?: UserProfile };
        console.log('hit');
        if (!userExists?.user) {
          await createUser(user.name!, user.email!, user.image!);
          return true;
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },

  theme: {
    colorScheme: 'light',
    logo: '/logo.png',
  },
};

export async function getCurrentUser() {
  const user = (await getServerSession(authOptions)) as SessionInterface;
  return user;
}
