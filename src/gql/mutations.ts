import gql from 'graphql-tag'

export const INSERT_LIKE = gql`
  mutation addLike($object: posts_likes_insert_input!) {
    insert_posts_likes_one(object: $object) {
      id
    }
  }
`

export const DELETE_LIKE = gql`
  mutation deleteLike($id: uuid!) {
    delete_posts_likes_by_pk(id: $id) {
      id
    }
  }
`
export const ADD_COMMENT = gql`
  mutation addComment($object: comments_insert_input!) {
    insert_comments_one(object: $object) {
      id
    }
  }
`

export const ADD_POST = gql`
  mutation addPost($object: posts_insert_input!) {
    insert_posts_one(
      object: $object
      on_conflict: { constraint: posts_pkey, update_columns: [content] }
    ) {
      id
    }
  }
`
export const DELETE_POST = gql`
  mutation deltePost($postId: uuid!) {
    delete_posts_by_pk(id: $postId) {
      id
    }
  }
`
