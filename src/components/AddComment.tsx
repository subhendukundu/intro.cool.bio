import React, { useRef } from 'react'
import { FiSend } from '@react-icons/all-files/fi/FiSend'
import { useMutation } from '@apollo/client'
import { ADD_COMMENT } from '~/gql/mutations'

type Props = {
  userId?: string
  postId: string
}

export default function AddComment({ userId, postId }: Props) {
  const [addComment] = useMutation(ADD_COMMENT)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  async function onSendComment(e: React.FormEvent<EventTarget>) {
    e.preventDefault()
    const { value = '' } = inputRef?.current || {}
    if (value && userId) {
      const object = {
        user_id: userId,
        post_id: postId,
        content: value,
      }
      console.log(object)
      await addComment({
        variables: {
          object,
        },
      })
      formRef.current?.reset()
    }
  }

  return (
    <form className="flex items-center justify-between" ref={formRef}>
      <textarea
        ref={inputRef}
        className="px-4 py-2 border dark:border-opacity-0 bg-gray-100 rounded-lg mt-5 w-10/12 sm:w-full outline-none dark:bg-opacity-10"
        placeholder="Comment here ..."
      />
      <button
        className="text-white rounded-full mt-4 cursor-pointer p-2 bg-pink-500 w-10 h-10 flex items-center justify-center sm:ml-3"
        onClick={onSendComment}
      >
        <FiSend />
      </button>
    </form>
  )
}
