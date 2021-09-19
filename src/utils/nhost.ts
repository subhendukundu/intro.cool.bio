import { createClient } from 'nhost-js-sdk'

const config = {
  baseURL: 'https://backend-44c8ca65.nhost.app',
}

const { auth, storage } = createClient(config)

export { auth, storage }
