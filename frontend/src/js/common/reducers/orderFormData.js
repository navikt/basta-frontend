import {
  SCOPED_RESOURCE_REQUEST_FAILED,
  SCOPED_RESOURCE_RECEIVED,
  SCOPED_RESOURCE_FETCHING,
  RESOURCES_REQUEST_FAILED,
  RESOURCES_RECEIVED,
  RESOURCES_FETCHING,
  APPLICATIONS_REQUEST_FAILED,
  APPLICATIONS_RECEIVED,
  APPLICATIONS_FETCHING,
  MQCLUSTERS_REQUEST_FAILED,
  MQCLUSTERS_RECEIVED,
  MQCLUSTERS_FETCHING,
  ENVIRONMENTS_REQUEST_FAILED,
  ENVIRONMENTS_RECEIVED,
  ENVIRONMENTS_FETCHING,
  DBTEMPLATES_REQUEST_FAILED,
  DBTEMPLATES_RECEIVED,
  DBTEMPLATES_FETCHING,
  VIRTUALSERVERS_REQUEST_FAILED,
  VIRTUALSERVERS_RECEIVED,
  VIRTUALSERVERS_FETCHING
} from '../actionTypes'

export default (
  state = {
    environments: {
      fetching: false,
      error: null,
      data: []
    },
    applications: {
      fetching: false,
      error: null,
      data: []
    },
    resources: {
      fetching: false,
      error: null,
      data: {
        u: [],
        t: [],
        q: [],
        p: []
      }
    },
    clusters: {
      fetching: false,
      error: null,
      data: []
    },
    scopedresources: {
      fetching: false,
      error: null,
      data: []
    },
    dbTemplates: {
      fetching: false,
      error: null,
      data: []
    },
    virtualServers: {
      fetching: false,
      error: null,
      data: []
    }
  },
  action
) => {
  switch (action.type) {
    case APPLICATIONS_FETCHING:
      return {
        ...state,
        applications: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case APPLICATIONS_RECEIVED:
      return {
        ...state,
        applications: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case APPLICATIONS_REQUEST_FAILED:
      return {
        ...state,
        applications: {
          fetching: false,
          error: action.error,
          data: []
        }
      }
    case RESOURCES_FETCHING:
      return {
        ...state,
        resources: {
          fetching: true,
          error: null,
          data: state.resources.data
        }
      }
    case RESOURCES_RECEIVED:
      return {
        ...state,
        resources: {
          fetching: false,
          error: null,
          data: { ...state.resources.data, [action.envClass]: action.value }
        }
      }
    case RESOURCES_REQUEST_FAILED:
      return {
        ...state,
        resources: {
          fetching: false,
          error: action.error,
          data: state.resources.data
        }
      }
    case SCOPED_RESOURCE_FETCHING:
      return {
        ...state,
        scopedresources: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case SCOPED_RESOURCE_RECEIVED:
      return {
        ...state,
        scopedresources: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case SCOPED_RESOURCE_REQUEST_FAILED:
      return {
        ...state,
        scopedresources: {
          fetching: false,
          error: action.error,
          data: []
        }
      }
    case MQCLUSTERS_FETCHING:
      return {
        ...state,
        clusters: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case MQCLUSTERS_RECEIVED:
      return {
        ...state,
        clusters: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case MQCLUSTERS_REQUEST_FAILED:
      return {
        ...state,
        environments: {
          fetching: false,
          error: null,
          data: []
        }
      }
    case ENVIRONMENTS_FETCHING:
      return {
        ...state,
        environments: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case ENVIRONMENTS_RECEIVED:
      return {
        ...state,
        environments: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case ENVIRONMENTS_REQUEST_FAILED:
      return {
        ...state,
        environments: {
          fetching: false,
          error: action.error,
          data: []
        }
      }
    case DBTEMPLATES_FETCHING:
      return {
        ...state,
        dbTemplates: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case DBTEMPLATES_RECEIVED:
      return {
        ...state,
        dbTemplates: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case DBTEMPLATES_REQUEST_FAILED:
      return {
        ...state,
        dbTemplates: {
          fetching: false,
          error: action.error,
          data: []
        }
      }
    case VIRTUALSERVERS_FETCHING:
      return {
        ...state,
        virtualServers: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case VIRTUALSERVERS_RECEIVED:
      return {
        ...state,
        virtualServers: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case VIRTUALSERVERS_REQUEST_FAILED:
      return {
        ...state,
        virtualServers: {
          fetching: false,
          error: action.error,
          data: []
        }
      }
    default:
      return state
  }
}
