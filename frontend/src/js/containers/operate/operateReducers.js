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
    nodes: {
      fetching: false,
      lastRequest: {},
      error: null,
      data: []
    },
    vmOperations: {
      fetching: false,
      error: null,
      lastQuery: null,
      data: []
    },
    credentialOperations: {
      fetching: false,
      lastRequest: {},
      error: null,
      data: {
        existInAD: null,
        existInFasit: null,
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
        nodes: {
          fetching: true,
          lastRequest: action.value,
          error: null,
          data: []
        }
      }
    case OPERATION_SUBMIT_SUCCESSFUL:
      return {
        ...state,
        nodes: {
          fetching: false,
          lastRequest: state.nodes.lastRequest,
          error: null,
          data: action.value
        }
      }
    case OPERATION_SUBMIT_FAILED:
      return {
        ...state,
        nodes: {
          fetching: false,
          lastRequest: state.nodes.lastRequest,
          error: action.error,
          data: []
        }
      }
    case VMLOOKUP_FETCHING:
      return {
        ...state,
        vmOperations: {
          fetching: true,
          error: null,
          data: [...state.vmOperations.data]
        }
      }
    case VMLOOKUP_RECEIVED:
      return {
        ...state,
        vmOperations: {
          fetching: false,
          error: null,
          lastQuery: action.query,
          data: action.value
        }
      }
    case VMLOOKUP_REQUEST_FAILED:
      return {
        ...state,
        vmOperations: {
          fetching: false,
          error: action.error,
          data: [...state.vmOperations.data]
        }
      }
    case CREDENTIAL_LOOKUP_SUBMITTING:
      return {
        ...state,
        credentialOperations: {
          fetching: true,
          error: null,
          data: state.credentialOperations.data
        }
      }
    case CREDENTIAL_LOOKUP_SUCCESSFUL:
      return {
        ...state,
        credentialOperations: {
          fetching: false,
          error: null,
          data: action.credentialInfo
        }
      }
    case CREDENTIAL_LOOKUP_FAILED:
      return {
        ...state,
        credentialOperations: {
          fetching: false,
          error: action.err
        }
      }
    default:
      return state
  }
}
