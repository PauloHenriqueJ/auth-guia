import { NextAuthOptions } from "next-auth";
import  CredentialProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github"

import { db } from "./db";


export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(db as any),
    providers:[
        GithubProvider({
        clientId:process.env.GITHUB_CLIENTID!,
        clientSecret:process.env.GITHUB_SECRET!
        }),
        CredentialProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text', placeholder:'jsmith'},
                password: {label: 'password', type: 'password'},
                username: {label: 'Name', type: 'text', placeholder:'John Smith'},
            },
            async authorize(credentials, req): Promise<any> {
                const  user = {email:'teste@dd101.com', password:'123456', name: 'Paulo'}
                return user;
            }

            })
    ],
    session:{
        strategy:"jwt"
    },
    secret: process.env.SECRET,
    debug: process.env.NODE_ENV === 'development',
}