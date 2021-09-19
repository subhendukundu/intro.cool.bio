import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import Post from '~/components/Post'
import Header from '~/components/Header'
import { GET_POST_BY_ID, GET_POST_BY_ID_FOR_USER } from '~/gql/query'
import PostLoader from '~/components/PostLoader'
import { auth } from '~/utils/nhost'
import MetaData from '~/components/MetaData'

export default function Hi({ message }: any) {
  const { id } = useParams() as any
  const history = useHistory()
  const user = auth.user()
  const {
    loading,
    error,
    data = {},
  } = useSubscription(user?.id ? GET_POST_BY_ID_FOR_USER : GET_POST_BY_ID, {
    variables: user?.id
      ? {
          postId: id,
          userId: user?.id,
        }
      : {},
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

  return (
    <>
      <MetaData title={data?.post?.content || 'Post'} />
      <div className="bg-gray-100 w-full flex flex-col h-screen items-center dark:bg-gray-700 dark:text-gray-200">
        <Header />
        <div className="flex flex-col mx-auto px-5 max-w-screen-sm w-full">
          <Post post={data?.post} owner={user?.id} />
        </div>
      </div>
    </>
  )
}
