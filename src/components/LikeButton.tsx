import React, { useState } from 'react'
import { IconHeart } from '@supabase/ui'
import { useMutation } from '@apollo/client'
import { INSERT_LIKE, DELETE_LIKE } from '~/gql/mutations'
import { useEffect } from 'react'

type Props = {
  ownLiked: boolean
  totalikedCount: number
  ifLiked: any
  owner: string | undefined
  id: string
}

export default function LikeButton({
  ownLiked,
  totalikedCount,
  ifLiked,
  owner,
  id,
}: Props) {
  const [isLiked, setLiked] = useState(ownLiked)
  const [insertLike, { loading: likeLoading }] = useMutation(INSERT_LIKE)
  const [deleteLike, { loading: unLikeLoading }] = useMutation(DELETE_LIKE)
  async function likePost() {
    setLiked(true)
    await insertLike({
      variables: {
        object: {
          user_id: owner,
          post_id: id,
        },
      },
    })
  }
  async function unlikePost() {
    const [postLike] = ifLiked
    setLiked(false)
    await deleteLike({
      variables: {
        id: postLike.id,
      },
    })
  }

  useEffect(() => {
    setLiked(ownLiked)
  }, [ownLiked])

  return (
    <div className="flex items-center">
      <button
        onClick={ownLiked ? unlikePost : likePost}
        disabled={likeLoading || unLikeLoading}
        className={likeLoading || unLikeLoading ? 'cursor-not-allowed' : ''}
      >
        <IconHeart fill={isLiked ? '#FF5733' : 'none'} stroke="currentColor" />
      </button>
      <span className="mx-1"> {totalikedCount} </span>Likes
    </div>
  )
}
