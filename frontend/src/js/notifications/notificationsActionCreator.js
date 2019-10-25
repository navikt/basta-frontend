import { POST_NOTIFICATION, NOTIFICATIONS_REQUEST } from '../actionTypes'

export const postNotification = notificationForm => {
  return { type: POST_NOTIFICATION, messagePayload: notificationForm }
}

export const fetchActiveNotifications = () => {
  return { type: NOTIFICATIONS_REQUEST }
}
