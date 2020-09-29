import {
  SCOPED_RESOURCE_REQUEST_FAILED,
  SCOPED_RESOURCE_RECEIVED,
  SCOPED_RESOURCE_FETCHING,
  MQ_QUEUE_MANAGERS_REQUEST_FAILED,
  MQ_QUEUE_MANAGERS_RECEIVED,
  MQ_QUEUE_MANAGERS_FETCHING,
  APPLICATIONS_REQUEST_FAILED,
  APPLICATIONS_RECEIVED,
  APPLICATIONS_FETCHING,
  MQCLUSTERS_REQUEST_FAILED,
  MQCLUSTERS_RECEIVED,
  MQCLUSTERS_FETCHING,
  MQQUEUES_REQUEST_FAILED,
  MQQUEUES_RECEIVED,
  MQQUEUES_FETCHING,
  MQCHANNELS_REQUEST_FAILED,
  MQCHANNELS_RECEIVED,
  MQCHANNELS_FETCHING,
  ENVIRONMENTS_REQUEST_FAILED,
  ENVIRONMENTS_RECEIVED,
  ENVIRONMENTS_FETCHING,
  DBTEMPLATES_REQUEST_FAILED,
  DBTEMPLATES_RECEIVED,
  DBTEMPLATES_FETCHING,
  VIRTUALSERVERS_REQUEST_FAILED,
  VIRTUALSERVERS_RECEIVED,
  VIRTUALSERVERS_FETCHING,
  CERTIFICATE_FASIT_REQUEST_FAILED,
  CERTIFICATE_FASIT_RECEIVED,
  CERTIFICATE_FASIT_RESET
} from '../../actionTypes'

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
      data: []
    },
    clusters: {
      fetching: false,
      error: null,
      data: []
    },
    queues: {
      fetching: false,
      error: null,
      data: []
    },
    channels: {
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
    },
    certificate: {
      existsInFasit: false
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
    case MQ_QUEUE_MANAGERS_FETCHING:
      return {
        ...state,
        resources: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case MQ_QUEUE_MANAGERS_RECEIVED:
      return {
        ...state,
        resources: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case MQ_QUEUE_MANAGERS_REQUEST_FAILED:
      return {
        ...state,
        resources: {
          fetching: false,
          error: action.error,
          data: []
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

    case MQQUEUES_FETCHING:
      return {
        ...state,
        queues: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case MQQUEUES_RECEIVED:
      return {
        ...state,
        queues: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case MQQUEUES_REQUEST_FAILED:
      return {
        ...state,
        queues: {
          fetching: false,
          error: null,
          data: []
        }
      }

    case MQCHANNELS_FETCHING:
      return {
        ...state,
        channels: {
          fetching: true,
          error: null,
          data: []
        }
      }
    case MQCHANNELS_RECEIVED:
      return {
        ...state,
        channels: {
          fetching: false,
          error: null,
          data: action.value
        }
      }
    case MQCHANNELS_REQUEST_FAILED:
      return {
        ...state,
        channels: {
          fetching: false,
          error: null,
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
        clusters: {
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
    case CERTIFICATE_FASIT_RECEIVED:
      return {
        ...state,
        certificate: {
          existsInFasit: action.value
        }
      }

    case CERTIFICATE_FASIT_REQUEST_FAILED:
    case CERTIFICATE_FASIT_RESET:
      return {
        ...state,
        certificate: {
          existsInFasit: false
        }
      }
    default:
      return state
  }
}
