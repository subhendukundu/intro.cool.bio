import React from 'react'
import { Helmet } from 'react-helmet-async'
import { renderRoutes } from 'react-router-config'
import { Context } from 'vite-ssr/react'
import { NhostAuthProvider } from '@nhost/react-auth'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { auth } from './utils/nhost'

export default function App({ router }: Context) {
  const title = 'intro.cool.bio'
  const description =
    'Open Source Intro tool, to let you get introducted with the right person.'

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta property="og:image" content="https://intro.cool.bio/demo.png.png" />
      </Helmet>
      <NhostAuthProvider auth={auth}>
        <NhostApolloProvider
          auth={auth}
          gqlEndpoint="https://hasura-44c8ca65.nhost.app/v1/graphql"
        >
          <main className="h-full min-h-screen">
            {renderRoutes(router.routes)}
          </main>
        </NhostApolloProvider>
      </NhostAuthProvider>
    </>
  )
}
