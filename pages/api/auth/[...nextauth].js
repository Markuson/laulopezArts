import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  site: process.env.NEXTAUTH_URL || 'http://localhost:3030',

  // Configure one or more authentication providers
  providers: [
    Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
  ],
  callbacks: {
    signin: async (profile, account, metadata) => {
      if ((profile.email===process.env.ADMIN_USER)||(profile.email===process.env.SUPERADMIN_USER)) {
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    },
    redirect: async (url, baseUrl) => {
      return Promise.resolve(`${baseUrl}/administradora`)
     },
  }
}

export default (req, res) => NextAuth(req, res, options)