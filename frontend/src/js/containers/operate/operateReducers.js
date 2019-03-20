import {
  OPERATION_SUBMITTING,
  OPERATION_SUBMIT_SUCCESSFUL,
  OPERATION_SUBMIT_FAILED,
  VMLOOKUP_FETCHING,
  VMLOOKUP_RECEIVED,
  VMLOOKUP_REQUEST_FAILED,
  CREDENTIAL_LOOKUP_SUBMITTING,
  CREDENTIAL_LOOKUP_SUCCESSFUL,
  CREDENTIAL_LOOKUP_FAILED
} from './operateActionTypes'

export default (
  state = {
    operations: {
      fetching: false,
      error: null,
      lastOrderId: null
    },
    vmLookup: {
      fetching: false,
      error: null,
      lastQuery: null,
      data: []
    },
    credentialLookup: {
      fetching: false,
      error: null,
      data: {
        existInAD: true,
        existInFasit: true,
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
    case VMLOOKUP_FETCHING:
      return {
        ...state,
        vmLookup: {
          fetching: true,
          error: null,
          data: [...state.vmLookup.data]
        }
      }
    case VMLOOKUP_RECEIVED:
      return {
        ...state,
        vmLookup: {
          fetching: false,
          error: null,
          lastQuery: action.query,
          data: action.value
        }
      }
    case VMLOOKUP_REQUEST_FAILED:
      return {
        ...state,
        vmLookup: {
          fetching: false,
          error: action.error,
          data: [...state.vmLookup.data]
        }
      }
    case CREDENTIAL_LOOKUP_SUBMITTING:
      return {
        ...state,
        credentialLookup: {
          fetching: true,
          error: null,
          data: state.credentialLookup.data
        }
      }
    case CREDENTIAL_LOOKUP_SUCCESSFUL:
      return {
        ...state,
        credentialLookup: {
          fetching: false,
          error: null,
          data: action.credentialInfo
        }
      }
    case CREDENTIAL_LOOKUP_FAILED:
      return {
        ...state,
        credentialLookup: {
          fetching: false,
          error: action.error,
          data: state.credentialLookup.data
        }
      }
    default:
      return state
  }
}
