import React from 'react'
import Header from '~/components/Header'
import CreatePost from '~/components/CreatePost'
import Posts from '~/components/Posts'
import MetaData from '~/components/MetaData'

export default function Home({ message }: any) {
  return (
    <>
      <MetaData title="intro.cool.bio | Home Page" />
      <div className="bg-gray-100 w-full h-full grid gap-4 grid-cols-1 items-center dark:bg-gray-700 dark:text-gray-200">
        <Header />
        <div className="flex flex-col mx-auto px-5 max-w-screen-sm w-full">
          <CreatePost />
          <Posts />
        </div>
      </div>
    </>
  )
}
