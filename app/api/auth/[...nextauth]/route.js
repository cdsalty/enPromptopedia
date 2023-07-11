// reviewed
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user'; // bring in user so we can compare and create if needed
import { connectToDatabase } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // after setting up the signin, we need to get the data about the user every single time to keep a running session. We need to get the user from the database and add it to the session object
      // console.log(session);
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session; // always making sure we know which user is active
    },

    // signIn is a serverless... aka, a lambda function that takes a profile object and returns a promise; It needs to be called in order for the server to spin up and run the function; It requires a connection to the database. It also doesn't run all the time which is good for performance.
    async signIn({ profile }) {
      try {
        await connectToDatabase();
        // check if user already exists in database
        const ifUserExists = await User.findOne({ email: profile.email });
        // if not, create user in database
        if (!ifUserExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }
        // else, return true to continue with sign in
        return true;
      } catch (error) {
        console.log(error);
        return false; // Return false if you do not want to allow sign in
      }
    },
  },
});

export { handler as GET, handler as POST };

/*
we need to create a function to create a new user and add it to the database;
- to be able to do this, we need to create a model based on which the document the user will be created;




*/
