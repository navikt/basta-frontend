import {
  FORM_SUBMITTING,
  FORM_SUBMIT_SUCCESSFUL,
  FORM_SUBMIT_FAILED,
  RESET_FORM,
  STATUSLOG_FETCHING,
  STATUSLOG_RECEIVED,
  STATUSLOG_REQUEST_FAILED,
  ORDER_FETCHING,
  ORDER_RECEIVED,
  ORDER_REQUEST_FAILED
} from './actionTypes'

export default (
  state = {
    form: {
      submitting: false,
      id: null,
      error: null
    },
    details: {
      fetching: false,
      data: null,
      error: null
    },
    statuslog: {
      fetching: false,
      data: null,
      error: null
    }
  },
  action
) => {
  switch (action.type) {
    // ORDERFORM

    case FORM_SUBMITTING:
      return {
        ...state,
        form: {
          ...state.form,
          submitting: true,
          id: null,
          error: null
        }
      }
    case RESET_FORM:
      return {
        ...state,
        form: {
          submitting: false,
          id: null,
          error: null
        }
      }
    case FORM_SUBMIT_SUCCESSFUL:
      return {
        ...state,
        form: {
          ...state.form,
          submitting: false,
          id: action.value.id,
          error: null
        }
      }
    case FORM_SUBMIT_FAILED:
      return {
        ...state,
        form: {
          ...state.form,
          submitting: false,
          id: null,
          error: action.error
        }
      }

    // STATUSLOG

    case STATUSLOG_FETCHING:
      return {
        ...state,
        statuslog: {
          ...state.statuslog,
          fetching: true,
          data: null,
          error: null
        }
      }
    case STATUSLOG_RECEIVED:
      return {
        ...state,
        statuslog: {
          ...state.statuslog,
          fetching: false,
          data: action.value,
          error: null
        }
      }
    case STATUSLOG_REQUEST_FAILED:
      return {
        ...state,
        statuslog: {
          ...state.statuslog,
          fetching: false,
          data: null,
          error: action.error
        }
      }

    // ORDER

    case ORDER_FETCHING:
      return {
        ...state,
        details: {
          ...state.details,
          fetching: true,
          data: null,
          error: null
        }
      }
    case ORDER_RECEIVED:
      return {
        ...state,
        details: {
          ...state.details,
          fetching: false,
          data: action.value,
          error: null
        }
      }
    case ORDER_REQUEST_FAILED:
      return {
        ...state,
        details: {
          ...state.details,
          fetching: false,
          data: null,
          error: action.error
        }
      }
    default:
      return state
  }
}
