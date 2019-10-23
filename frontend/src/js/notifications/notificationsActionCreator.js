import { POST_NOTIFICATION } from '../actionTypes'

export const postNotification = message => {
  return { type: POST_NOTIFICATION, message: message }
}
