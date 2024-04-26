import dateToSeconds from '../lib/dateToSeconds'

type DecodedTokenProps = {
  header: {
    alg: string
    typ: string
  }
  payload: {
    exp: number
    iat: number
    sub: number
  }
}

import { Buffer } from 'buffer'

type DecodedToken = {
  header: object
  payload: object
}

const atob = (str: string) => Buffer.from(str, 'base64').toString()

const jwtDecoder = (token: string): DecodedToken | null => {
  const [headerEncoded, payloadEncoded, signature] = token.split('.')
  if (!headerEncoded || !payloadEncoded || !signature) {
    return null
  }

  try {
    const header = JSON.parse(atob(headerEncoded))
    const payload = JSON.parse(atob(payloadEncoded))
    return {
      header,
      payload,
    }
  } catch (error) {
    console.error('Error decoding JWT:', (error as Error).message)
    return null
  }
}

export default jwtDecoder

export const checkTokenStillValid = (accessToken: string) => {
  const decodedToken = jwtDecoder(accessToken) as DecodedTokenProps
  const date = new Date()

  if (decodedToken?.payload?.exp > dateToSeconds(date)) {
    console.log('Decoded token:', decodedToken, dateToSeconds(date))
    return true
  }
  return false
}
