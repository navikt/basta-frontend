import {
  OPERATION_SUBMITTING,
  OPERATION_SUBMIT_SUCCESSFUL,
  OPERATION_SUBMIT_FAILED,
  CREDENTIAL_LOOKUP_SUBMITTING,
  CREDENTIAL_LOOKUP_SUCCESSFUL,
  CREDENTIAL_LOOKUP_FAILED,
  CREDENTIAL_LOOKUP_RESET,
  GROUP_LOOKUP_SUBMITTING,
  GROUP_LOOKUP_SUCCESSFUL,
  GROUP_LOOKUP_FAILED,
  GROUP_LOOKUP_RESET
} from '../actionTypes'

export default (
  state = {
    operations: {
      fetching: false,
      error: null,
      lastOrderId: null
    },
    credentialLookup: {
      fetching: false,
      lookupComplete: false,
      error: null,
      data: {
        existInAD: false,
        existInFasit: false,
        user: {}
      }
    }
  },
  action
) => {
  switch (action.type) {
    case OPERATION_SUBMITTING:
      return {
        ...state,
        operations: {
          fetching: true,
          error: null,
          lastOrderId: null
        }
      }
    case OPERATION_SUBMIT_SUCCESSFUL:
      return {
        ...state,
        operations: {
          fetching: false,
          error: null,
          lastOrderId: action.value.orderId
        }
      }
    case OPERATION_SUBMIT_FAILED:
      return {
        ...state,
        operations: {
          fetching: false,
          error: action.error,
          lastOrderId: null
        }
      }
    case CREDENTIAL_LOOKUP_RESET:
      return {
        ...state,
        credentialLookup: {
          fetching: false,
          lookupComplete: false,
          error: null,
          data: {
            existInAD: false,
            existInFasit: false,
            user: {}
          }
        }
      }
    case CREDENTIAL_LOOKUP_SUBMITTING:
      return {
        ...state,
        credentialLookup: {
          fetching: true,
          lookupComplete: false,
          error: null,
          data: state.credentialLookup.data
        }
      }
    case CREDENTIAL_LOOKUP_SUCCESSFUL:
      return {
        ...state,
        credentialLookup: {
          fetching: false,
          lookupComplete: true,
          error: null,
          data: action.credentialInfo
        }
      }
    case CREDENTIAL_LOOKUP_FAILED:
      return {
        ...state,
        credentialLookup: {
          fetching: false,
          lookupComplete: false,
          error: action.error,
          data: state.credentialLookup.data
        }
      }
    case GROUP_LOOKUP_RESET:
      return {
        ...state,
        groupLookup: {
          fetching: false,
          lookupComplete: false,
          error: null,
          data: {
            existInAD: false,
            group: {}
          }
        }
      }
    case GROUP_LOOKUP_SUBMITTING:
      return {
        ...state,
        groupLookup: {
          fetching: true,
          lookupComplete: false,
          error: null,
          data: state.groupLookup.data
        }
      }
    case GROUP_LOOKUP_SUCCESSFUL:
      return {
        ...state,
        groupLookup: {
          fetching: false,
          lookupComplete: true,
          error: null,
          data: action.groupInfo
        }
      }
    case GROUP_LOOKUP_FAILED:
      return {
        ...state,
        groupLookup: {
          fetching: false,
          lookupComplete: false,
          error: action.error,
          data: state.groupLookup.data
        }
      }
    default:
      return state
  }
}
