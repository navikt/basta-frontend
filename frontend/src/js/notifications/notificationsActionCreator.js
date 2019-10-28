import { POST_NOTIFICATION, NOTIFICATIONS_REQUEST, REMOVE_NOTIFICATION } from '../actionTypes'

export const postNotification = notificationForm => {
  return { type: POST_NOTIFICATION, messagePayload: notificationForm }
}

export const removeNotification = id => {
  return { type: REMOVE_NOTIFICATION, id }
}

export const fetchActiveNotifications = () => {
  return { type: NOTIFICATIONS_REQUEST }
}
