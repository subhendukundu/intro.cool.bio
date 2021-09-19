import gql from 'graphql-tag'

export const GET_POSTS_WITH_USER = gql`
  subscription getItems($limit: Int, $userId: uuid) {
    posts(limit: $limit, order_by: { created_at: desc }) {
      id
      content
      date: created_at
      user {
        username: display_name
        id
        image: avatar_url
      }
      likedCount: posts_likes_aggregate {
        aggregate {
          count
        }
      }
      ifLiked: posts_likes(where: { user_id: { _eq: $userId } }) {
        id
      }
      comments(limit: 3) {
        content
        id
        date: created_at
        user {
          username: display_name
          id
          image: avatar_url
        }
      }
      totalComments: comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const GET_POSTS_WITH_OUT_USER = gql`
  subscription getItems($limit: Int) {
    posts(limit: $limit, order_by: { created_at: desc }) {
      id
      content
      date: created_at
      user {
        username: display_name
        id
        image: avatar_url
      }
      likedCount: posts_likes_aggregate {
        aggregate {
          count
        }
      }
      comments(limit: 3) {
        content
        id
        date: created_at
        user {
          username: display_name
          id
          image: avatar_url
        }
      }
      totalComments: comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const GET_POSTS_COUNT = gql`
  subscription getItems {
    posts: posts_aggregate {
      aggregate {
        count
      }
    }
  }
`
