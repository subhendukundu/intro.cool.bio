import React, { useState } from 'react'
import Post from './Post'
import { useSubscription } from '@apollo/client'
import { auth } from '~/utils/nhost'
import {
  GET_POSTS_WITH_USER,
  GET_POSTS_WITH_OUT_USER,
  GET_POSTS_COUNT,
} from '~/gql/subscriptions'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PostType } from '~/types/post'
import PostLoader from './PostLoader'

export default function Posts() {
  const user = auth.user()
  const [totalPosts, setTotalPosts] = useState(0)
  const [limit, setLimit] = useState(6)
  const {
    loading,
    error,
    data = {},
  } = useSubscription(
    user?.id ? GET_POSTS_WITH_USER : GET_POSTS_WITH_OUT_USER,
    {
      variables: user?.id
        ? {
            userId: user?.id,
            limit,
          }
        : {
            limit,
          },
    }
  )

  const { loading: totalPostsLoading, error: hasErrorInTotal } =
    useSubscription(GET_POSTS_COUNT, {
      onSubscriptionData: ({ subscriptionData = {} }) => {
        console.log(subscriptionData)
        const { count = 0 } = subscriptionData?.data?.posts?.aggregate || {}
        setTotalPosts(count)
      },
    })
  const { posts = [] } = data

  console.log(loading, error, data, totalPosts)

  const loadMoreHandler = () => {
    setLimit((prev: number) => prev + 6)
  }

  if (error || hasErrorInTotal) {
    return (
      <p className="text-2xl h-screen">
        {error?.message || hasErrorInTotal?.message}
      </p>
    )
  }

  if (loading || totalPostsLoading) {
    return (
      <div className="h-screen">
        <PostLoader />
      </div>
    )
  }

  if (!posts?.length) {
    return <p className="text-2xl h-screen">No posts yes! Create one?</p>
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMoreHandler}
      hasMore={posts.length < totalPosts}
      loader={<PostLoader />}
    >
      {posts.map((post: PostType) => (
        <Post key={post.id} post={post} owner={user?.id} />
      ))}
    </InfiniteScroll>
  )
}
