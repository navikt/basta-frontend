import {
  OPERATION_SUBMITTING,
  OPERATION_SUBMIT_SUCCESSFUL,
  OPERATION_SUBMIT_FAILED
} from './operateActionTypes'

export default (
  state = {
    nodes: {
      fetching: false,
      lastRequest: {},
      error: null,
      data: []
    }
  },
  action
) => {
  switch (action.type) {
    // NODES
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
    default:
      return state
  }
}
