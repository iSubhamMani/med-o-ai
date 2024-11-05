import { UserModel } from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./db";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.user = {
          email: user?.email,
          name: user?.name,
          image: user?.image,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
    async signIn({ user }) {
      await connectDB();

      const u = await UserModel.findOne({ email: user.email });

      const email = user.email;
      const name = user.name;
      const image = user.image;

      if (!u) {
        const newUser = new UserModel({
          email,
          image,
          name,
        });
        await newUser.save();
      }
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
};
