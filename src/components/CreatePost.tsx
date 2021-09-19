import React, { useRef } from 'react'
import { BsChatDots } from '@react-icons/all-files/bs/BsChatDots'
// import { BsCardImage } from '@react-icons/all-files/bs/BsCardImage'
// import { BsCameraVideo } from '@react-icons/all-files/bs/BsCameraVideo'
import { FiSend } from '@react-icons/all-files/fi/FiSend'
import { useMutation } from '@apollo/client'
import { ADD_POST } from '~/gql/mutations'
import { auth } from '~/utils/nhost'
import { useAuth } from '@nhost/react-auth'
import { useHistory } from 'react-router-dom'

type Props = {
  post?: string
  edit?: boolean
  id?: string
}

export default function CreatePost({ post, edit, id }: Props) {
  const { signedIn } = useAuth()
  const user = auth.user()
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [addPost] = useMutation(ADD_POST)
  console.log('user', user)
  const history = useHistory()

  async function createNewPost(e: React.FormEvent<EventTarget>) {
    e.preventDefault()
    const { value = '' } = inputRef?.current || {}
    console.log(value, user)
    if (value && user?.id) {
      const object = id
        ? { id, user_id: user?.id, content: value }
        : {
            user_id: user?.id,
            content: value,
          }
      console.log(object)
      await addPost({
        variables: {
          object,
        },
      })
      if (id) {
        history.push(`/p/${id}`)
      } else {
        formRef.current?.reset()
      }
    }
  }

  if (signedIn === null) {
    return <div>loading...</div>
  }

  return (
    <div className="flex bg-white rounded-md p-5 my-5 dark:bg-gray-800 dark:text-gray-200">
      <form className="flex flex-col flex-1" ref={formRef}>
        <span className="font-bold text-base md:text-lg text-gray-400">
          {edit ? 'Update referral request' : 'Request referrals'}
        </span>
        <div className="flex justify-between items-center p-3 bg-gray-100 mt-5 rounded-md dark:bg-opacity-10 ">
          <div className="text-gray-500 rounded-full p-2 bg-white w-10 h-10 flex items-center justify-center dark:bg-opacity-10">
            <BsChatDots />
          </div>
          <textarea
            className="w-full bg-transparent p-4 outline-none text-sm md:text-base"
            placeholder="What's up!"
            defaultValue={post}
            ref={inputRef}
          />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center">
            {/* <div className="text-gray-500 flex items-center cursor-pointer">
              <BsCardImage className="mr-4" />
              <span>Image</span>
            </div>
            <div className="text-gray-500 flex items-center ml-5 border-l border-gray-400 cursor-pointer">
              <BsCameraVideo className=" ml-6" />
              <span className="ml-2">Video</span>
            </div> */}
          </div>
          <button
            className={`${
              edit ? 'bg-green-700' : 'bg-blue-700'
            } rounded-full  dark:bg-opacity-40 text-white px-3 py-1 sm:px-6 sm:py2`}
            onClick={createNewPost}
          >
            <span className="flex items-center justify-between">
              <FiSend />
              <span className="ml-3 text-sm md:text-base">
                {edit ? 'Update' : 'Publish'}
              </span>
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
