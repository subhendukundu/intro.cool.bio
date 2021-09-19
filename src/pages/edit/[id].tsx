import React from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Header from '~/components/Header'
import { GET_POST_BY_ID_TO_EDIT } from '~/gql/query'
import PostLoader from '~/components/PostLoader'
import { auth } from '~/utils/nhost'
import CreatePost from '~/components/CreatePost'
import MetaData from '~/components/MetaData'

export default function Hi({ message }: any) {
  const { id } = useParams() as any
  const history = useHistory()
  const user = auth.user()
  const {
    loading,
    error,
    data = {},
  } = useQuery(GET_POST_BY_ID_TO_EDIT, {
    variables: {
      postId: id,
    },
  })

  console.log(data)

  if (error) {
    return <p className="text-2xl h-screen">{error?.message}</p>
  }

  if (loading) {
    return (
      <div className="h-screen">
        <PostLoader />
      </div>
    )
  }

  if (!user?.id) {
    return <Redirect to="/" />
  }

  return (
    <>
      <MetaData title="Edit post" />
      <div className="bg-gray-100 w-full flex flex-col h-screen items-center dark:bg-gray-700 dark:text-gray-200">
        <Header />
        <div className="flex flex-col mx-auto px-5 max-w-screen-sm w-full">
          <CreatePost edit post={data?.post?.content} id={data?.post?.id} />
        </div>
      </div>
    </>
  )
}
