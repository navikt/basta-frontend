import {
  USER_PROFILE_FETCHING,
  USER_PROFILE_RECEIVED,
  USER_PROFILE_REQUEST_FAILED,
  USER_SESSION_EXPIRED
} from '../../actionTypes'

export default (
  state = {
    userProfile: {
      userName: '',
      roles: {}
    },
    isUserAuthenticated: false,
    isFetching: false,
    requestFailed: false,
    requestStatus: ''
  },
  action
) => {
  switch (action.type) {
    // USER PROFILE

    case USER_PROFILE_FETCHING:
      return {
        ...state,
        requestFailed: false,
        requestStatus: 'Fetching user profile'
      }
    case USER_PROFILE_RECEIVED:
      return {
        ...state,
        userProfile: action.value,
        isUserAuthenticated: true,
        requestFailed: false,
        requestStatus: 'User profile lookup successful'
      }
    case USER_PROFILE_REQUEST_FAILED:
      return {
        ...state,
        userProfile: {},
        isUserAuthenticated: false,
        requestFailed: true,
        requestStatus: action.err
      }

    // USER SESSION LOOKUP

    case USER_SESSION_EXPIRED:
      return {
        ...state,
        userProfile: {},
        isUserAuthenticated: false,
        requestStatus: 'Session expired'
      }
    default:
      return state
  }
}
