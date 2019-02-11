import {
  USER_PROFILE_REQUEST,
  INITIALIZE_APPLICATION,
  USER_LOGOUT,
  ENVIRONMENTS_REQUEST,
  RESOURCES_REQUEST,
  APPLICATIONS_REQUEST,
  SCOPED_RESOURCE_REQUEST,
  MQCLUSTERS_REQUEST,
  MQCLUSTERS_RECEIVED,
  DBTEMPLATES_REQUEST
} from '../actionTypes'

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

export const fetchResources = envClass => {
  return { type: RESOURCES_REQUEST, envClass }
}

export const fetchScopedResources = (envClass, environment, application) => {
  return { type: SCOPED_RESOURCE_REQUEST, envClass, environment, application }
}

export const fetchMqClusters = (environmentClass, queueManager) => {
  return { type: MQCLUSTERS_REQUEST, environmentClass, queueManager }
}

export const clearMqClusters = () => {
  return { type: MQCLUSTERS_RECEIVED, value: [] }
}

export const fetchDbTemplates = (environmentClass, zone) => {
  return { type: DBTEMPLATES_REQUEST, environmentClass, zone }
}
