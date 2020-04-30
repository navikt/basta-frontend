import {
  USER_PROFILE_REQUEST,
  INITIALIZE_APPLICATION,
  USER_LOGOUT,
  ENVIRONMENTS_REQUEST,
  MQ_QUEUE_MANAGERS_REQUEST,
  MQ_QUEUE_MANAGERS_RECEIVED,
  APPLICATIONS_REQUEST,
  MQCLUSTERS_REQUEST,
  MQCLUSTERS_RECEIVED,
  MQQUEUES_REQUEST,
  DBTEMPLATES_REQUEST,
  VIRTUALSERVERS_REQUEST,
  CERTIFICATE_FASIT_REQUEST,
  CERTIFICATE_FASIT_RESET,
  CREDENTIAL_LOOKUP_RESET
} from '../../actionTypes'

export const fetchUserProfile = () => {
  return { type: USER_PROFILE_REQUEST }
}
export const userLogout = () => {
  return { type: USER_LOGOUT }
}

export const initializeApplication = () => {
  return { type: INITIALIZE_APPLICATION }
}

export const fetchEnvironments = environmentClass => {
  return { type: ENVIRONMENTS_REQUEST, environmentClass }
}

export const fetchApplications = () => {
  return { type: APPLICATIONS_REQUEST }
}

export const fetchMQQueueManagers = (envClass, envName) => {
  return { type: MQ_QUEUE_MANAGERS_REQUEST, envClass, envName }
}

export const clearMqQueueManagers = () => {
  return { type: MQ_QUEUE_MANAGERS_RECEIVED, value: [] }
}

export const fetchMqClusters = (environmentClass, queueManager) => {
  return { type: MQCLUSTERS_REQUEST, environmentClass, queueManager }
}

export const fetchMqQueues = (environmentClass, queueManager) => {
  return { type: MQQUEUES_REQUEST, environmentClass, queueManager }
}

export const clearMqClusters = () => {
  return { type: MQCLUSTERS_RECEIVED, value: [] }
}

export const fetchDbTemplates = (environmentClass, zone) => {
  return { type: DBTEMPLATES_REQUEST, environmentClass, zone }
}

export const fetchVirtualServers = (environmentClass, environment, application, zone) => {
  return { type: VIRTUALSERVERS_REQUEST, environmentClass, environment, application, zone }
}

export const certificateExistInFasit = (environmentClass, zone, application) => {
  return { type: CERTIFICATE_FASIT_REQUEST, environmentClass, zone, application }
}

export const clearExistingCertificateMessage = () => {
  return { type: CERTIFICATE_FASIT_RESET }
}

export const clearExistingCredentialMessage = () => {
  return { type: CREDENTIAL_LOOKUP_RESET }
}
