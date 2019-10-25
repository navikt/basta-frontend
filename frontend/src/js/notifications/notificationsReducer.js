import {
  POST_NOTIFICATION_FAILED,
  POST_NOTIFICATION_SUCCESSFUL,
  POST_NOTIFICATION_SUBMITTING,
  ACTIVE_NOTIFICATIONS_RECEIVED,
  NOTIFICATIONS_REQUEST_FAILED
} from '../actionTypes'

export default (
  state = {
    activeNotifications: [],
    form: {
      submitting: false,
      error: null
    }
  },
  action
) => {
  switch (action.type) {
    case ACTIVE_NOTIFICATIONS_RECEIVED:
      return {
        ...state,
        activeNotifications: action.value
      }
    case NOTIFICATIONS_REQUEST_FAILED:
      return {
        ...state,
        activeNotifications: []
      }
    case POST_NOTIFICATION_SUBMITTING:
      return {
        ...state,
        form: {
          submitting: true,
          error: null
        }
      }

    case POST_NOTIFICATION_SUCCESSFUL:
      return {
        ...state,
        form: {
          submitting: false,
          error: null
        }
      }
    case POST_NOTIFICATION_FAILED:
      return {
        ...state,
        form: {
          submitting: false,
          error: action.error
        }
      }
    default:
      return state
  }
}
