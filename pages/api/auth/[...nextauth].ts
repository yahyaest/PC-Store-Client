import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../graphQL/apollo-client";
import { loginMutation, meQuery } from "../../../graphQL/userQueries";

export default NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  jwt: {},
  providers: [
    // CredentialsProvider({
    //   credentials: {
    //     username: { label: "Username", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },

    //   async authorize(credentials, req) {
    //     const login = await client.mutate({
    //       mutation: loginMutation,
    //       variables: {
    //         username: credentials!.username,
    //         password: credentials!.password,
    //       },
    //     });

    //     const user = login.data.login;
    //     console.log("user gin :", user)
    
    //     console.log("me gin :", req.headers)

        
    //     const me = await client.query({
    //       query: meQuery,
    //     });
    //     console.log("me gin :", me)



    //     if (user) {
    //       return {token:user.token};
    //       // Any object returned will be saved in `user` property of the JWT
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       throw new Error("No user found!");
    //       return null;
    //     }
    //   },
    // }),
  ],
});
