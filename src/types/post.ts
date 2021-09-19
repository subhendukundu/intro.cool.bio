export interface LikedCount {
  aggregate: Aggregate
}

export interface Aggregate {
  count: number
}

export interface LikedId {
  id: string
}

export type Comment = {
  username: string
  content: string
  date: string
  user: User
}
export type User = {
  username: string
  image: string
  id: string
}

export type AggregateCount = {
  count: number
}

export type TotalComments = {
  aggregate: AggregateCount
}

export type PostType = {
  id: string
  user: User
  content: string
  comments: Comment[]
  likes: any
  date: string
  likedCount: LikedCount
  ifLiked: LikedId[]
  totalComments: TotalComments
}
