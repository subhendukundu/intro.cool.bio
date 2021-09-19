import React, { useState } from 'react'
import {
  Dropdown,
  IconAlertCircle,
  IconTrash,
  Modal,
  Typography,
} from '@supabase/ui'

export default function DeletePostOption() {
  const [visible, setVisible] = useState(false)

  function toggle() {
    console.log('on delete')
    setVisible(!visible)
  }
  function deletePost() {}
  return (
    <>
      <Dropdown.Item
        icon={<IconTrash stroke="red" />}
        key="delete"
        onClick={toggle}
      >
        <Typography.Text>Delete</Typography.Text>
      </Dropdown.Item>
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
    </>
  )
}
