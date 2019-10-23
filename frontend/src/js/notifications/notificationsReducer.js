import {
  POST_NOTIFICATION_FAILED,
  POST_NOTIFICATION_SUCCESSFUL,
  POST_NOTIFICATION_SUBMITTING
} from '../actionTypes'

export default (
  state = {
    form: {
      submitting: false,
      error: null
    }
  },
  action
) => {
  switch (action.type) {
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
