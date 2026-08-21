import { createApi } from 'unsplash-js'

const key = process.env.NEXT_PUBLIC_API_ACCESS_KEY

const unsplash = createApi({
  accessKey: key || 'demo_key'
})

export default unsplash
