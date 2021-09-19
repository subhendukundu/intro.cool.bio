import React, { useState } from 'react'
import { BsChatDots } from '@react-icons/all-files/bs/BsChatDots'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  Button,
  Divider,
  Dropdown,
  IconAlertCircle,
  IconEdit,
  IconLink,
  IconMoreHorizontal,
  IconTrash,
  Modal,
  Typography,
} from '@supabase/ui'
import AddComment from './AddComment'
import LikeButton from './LikeButton'
import { PostType } from '~/types/post'
import { DELETE_POST } from '~/gql/mutations'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import PostLoader from './PostLoader'
import Linkify from 'react-linkify'

dayjs.extend(relativeTime)

type Props = {
  owner: string | undefined
  post: PostType
}

export default function Post({ owner, post }: Props) {
  const {
    id,
    content,
    likedCount,
    comments = [],
    date,
    ifLiked,
    user,
    totalComments,
  } = post
  const { image, username } = user
  const isOwner = owner === user?.id
  const ownLiked = ifLiked?.length > 0
  const totalikedCount = likedCount?.aggregate?.count
  const [visible, setVisible] = useState(false)
  const [deletePostById, { loading }] = useMutation(DELETE_POST)
  const history = useHistory()

  function toggle() {
    setVisible(!visible)
  }
  async function deletePost() {
    await deletePostById({
      variables: {
        postId: id,
      },
    })
    history.push('/')
  }

  function copyLink() {
    navigator.clipboard.writeText(`${window?.location?.origin}/p/${id}`)
  }

  function editPost() {
    history.push(`/edit/${id}`)
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
      <Modal
        title="Are you sure?"
        description="This is irreversible Change"
        visible={visible}
        onCancel={toggle}
        onConfirm={deletePost}
        icon={<IconAlertCircle background="brand" size="xlarge" />}
      >
        <Typography.Text>Please choose an option</Typography.Text>
      </Modal>
      <div className="sm:flex bg-white break-words rounded-md p-2 py-4 sm:p-5 my-5 shadow-lg dark:bg-gray-800 dark:text-gray-200">
        <div className="w-12 mr-2">
          <img
            src={image}
            alt="profile"
            className="rounded-full w-11 h-11 mr-3"
          />
        </div>
        <div className="col-span-9 flex flex-col w-full pt-4 sm:pt-0 sm:pl-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex flex-col items-start">
                <span className="font-semibold text-md md:text-lg">
                  {username}
                </span>
                <span className="text-gray-400 text-xs">
                  {dayjs(dayjs(date)).fromNow()}
                </span>
              </div>
            </div>
            <Dropdown
              side="bottom"
              align="end"
              overlay={[
                <Dropdown.Item
                  icon={<IconLink />}
                  key="copy"
                  onClick={copyLink}
                >
                  <Typography.Text>Copy</Typography.Text>
                </Dropdown.Item>,
                isOwner && (
                  <Dropdown.Item
                    icon={<IconEdit />}
                    key="edit"
                    onClick={editPost}
                  >
                    <Typography.Text>Edit</Typography.Text>
                  </Dropdown.Item>
                ),
                isOwner && <Divider light />,
                isOwner && (
                  <Dropdown.Item
                    icon={<IconTrash stroke="red" />}
                    key="delete"
                    onClick={toggle}
                  >
                    <Typography.Text>Delete</Typography.Text>
                  </Dropdown.Item>
                ),
              ]}
            >
              <Button type="outline">
                <IconMoreHorizontal />
              </Button>
            </Dropdown>
          </div>
          <div>
            <Linkify>
              <span className="mt-2 break-words text-sm md:text-md">
                {content}
              </span>
            </Linkify>
          </div>
          <div className="flex mt-4 items-center text-gray-500">
            <LikeButton
              ownLiked={ownLiked}
              totalikedCount={totalikedCount}
              ifLiked={ifLiked}
              owner={owner}
              id={id}
            />
            <div className="flex items-center ml-5">
              <BsChatDots fontSize="1.3em" />
              <span className="mx-1"> {totalComments?.aggregate?.count} </span>
              Comments
            </div>
          </div>
          <AddComment userId={owner} postId={id} />
          {comments.map((comment: any) => (
            <div
              className="grid grid-cols-9 md:grid-cols-10 break-words w-full mt-5"
              key={comment.id}
            >
              <div>
                <img
                  src={comment?.user?.image}
                  alt="profile"
                  className="rounded-full w-9 h-9"
                />
              </div>
              <div className="col-span-8 md:col-span-9 flex flex-col w-full pl-2 sm:pl-0">
                <div className="flex flex-col">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-md md:text-md">
                      {comment?.user?.username}
                    </span>
                    <span className="text-gray-400  text-xs">
                      {dayjs(dayjs(comment.date)).fromNow()}
                    </span>
                    <div>
                      <Linkify>
                        <p className="text-sm md:text-md">{comment.content}</p>
                      </Linkify>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {totalComments?.aggregate?.count > 3 && (
            <button
              onClick={() => console.log(3)}
              className="mr-auto text-sm mt-4 font-medium text-pink-500"
            >
              Show all comments
            </button>
          )}
        </div>
      </div>
    </>
  )
}
