import { POST_NOTIFICATION } from '../actionTypes'

export const postNotification = notificationForm => {
  return { type: POST_NOTIFICATION, messagePayload: notificationForm }
}
