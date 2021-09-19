import gql from 'graphql-tag'

export const GET_POST_BY_ID_FOR_USER = gql`
  query getPost($postId: uuid!, $userId: uuid!) {
    post: posts_by_pk(id: $postId) {
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

export const GET_POST_BY_ID = gql`
  query getPost($postId: uuid!) {
    post: posts_by_pk(id: $postId) {
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

export const GET_POST_BY_ID_TO_EDIT = gql`
  query getPost($postId: uuid!) {
    post: posts_by_pk(id: $postId) {
      id
      content
    }
  }
`
