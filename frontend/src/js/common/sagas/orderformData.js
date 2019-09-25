import { takeEvery, takeLatest, put, fork, call, select } from 'redux-saga/effects'
import { getUrl } from '../utils'
import { getLastQuery } from './selectors'
import {
  MQCLUSTERS_REQUEST,
  MQCLUSTERS_FETCHING,
  MQCLUSTERS_REQUEST_FAILED,
  MQCLUSTERS_RECEIVED,
  SCOPED_RESOURCE_REQUEST,
  SCOPED_RESOURCE_FETCHING,
  SCOPED_RESOURCE_REQUEST_FAILED,
  SCOPED_RESOURCE_RECEIVED,
  RESOURCES_REQUEST,
  RESOURCES_FETCHING,
  RESOURCES_REQUEST_FAILED,
  RESOURCES_RECEIVED,
  ENVIRONMENTS_REQUEST,
  ENVIRONMENTS_FETCHING,
  ENVIRONMENTS_REQUEST_FAILED,
  ENVIRONMENTS_RECEIVED,
  APPLICATIONS_REQUEST,
  APPLICATIONS_FETCHING,
  APPLICATIONS_REQUEST_FAILED,
  APPLICATIONS_RECEIVED,
  DBTEMPLATES_REQUEST,
  DBTEMPLATES_FETCHING,
  DBTEMPLATES_REQUEST_FAILED,
  DBTEMPLATES_RECEIVED,
  VIRTUALSERVERS_REQUEST,
  VIRTUALSERVERS_FETCHING,
  VIRTUALSERVERS_REQUEST_FAILED,
  VIRTUALSERVERS_RECEIVED
} from '../actionTypes'

export function* fetchScopedResource(action) {
  yield put({ type: SCOPED_RESOURCE_FETCHING })
  try {
    let resources = yield call(
      getUrl,
      `/rest/v1/fasit/resources?application=${action.application}&envClass=${action.envClass}&environment=${action.environment}&type=QueueManager&bestmatch=true`
    )
    yield put({ type: SCOPED_RESOURCE_RECEIVED, value: resources })
  } catch (err) {
    yield put({ type: SCOPED_RESOURCE_REQUEST_FAILED, err })
  }
}
//https://basta.adeo.no/rest/v1/fasit/resources?type=QueueManager&envClass=u&usage=true
export function* fetchResources(action) {
  yield put({ type: RESOURCES_FETCHING })
  try {
    let resources = yield call(
      getUrl,
      `/rest/v1/fasit/resources?envClass=${action.envClass}&type=QueueManager&usage=true`
    )
    yield put({ type: RESOURCES_RECEIVED, value: resources, envClass: action.envClass })
  } catch (err) {
    yield put({ type: RESOURCES_REQUEST_FAILED, err })
  }
}
// https://basta.adeo.no/rest/v1/mq/clusters?environmentClass=p&queueManager=mq:%2F%2Fd26apvl126.test.local:1412%2FMTLCLIENT01
export function* fetchMqClusters(action) {
  yield put({ type: MQCLUSTERS_FETCHING })
  try {
    let resources = yield call(
      getUrl,
      `/rest/v1/mq/clusters?environmentClass=${
        action.environmentClass
      }&queueManager=${encodeURIComponent(action.queueManager)}`
    )
    yield put({ type: MQCLUSTERS_RECEIVED, value: resources })
  } catch (err) {
    yield put({ type: MQCLUSTERS_REQUEST_FAILED, err })
  }
}
export function* fetchApplications() {
  yield put({ type: APPLICATIONS_FETCHING })
  try {
    let applications = yield call(getUrl, '/rest/v1/fasit/applications')
    let filteredApplications = applications.map(application => {
      return application.name
    })
    yield put({ type: APPLICATIONS_RECEIVED, value: filteredApplications })
  } catch (err) {
    yield put({ type: APPLICATIONS_REQUEST_FAILED, err })
  }
}

export function* fetchEnvironments(action) {
  yield put({ type: ENVIRONMENTS_FETCHING })
  try {
    let environments = yield call(getUrl, '/rest/v1/fasit/environments')
    yield put({ type: ENVIRONMENTS_RECEIVED, value: environments })
  } catch (err) {
    yield put({ type: ENVIRONMENTS_REQUEST_FAILED, err })
  }
}

export function* fetchDbTemplates(action) {
  yield put({ type: DBTEMPLATES_FETCHING })
  try {
    let templates = yield call(
      getUrl,
      `/rest/v1/oracledb/templates?environmentClass=${action.environmentClass}&zone=${action.zone}`
    )
    yield put({ type: DBTEMPLATES_RECEIVED, value: templates })
  } catch (err) {
    yield put({ type: DBTEMPLATES_REQUEST_FAILED, err })
  }
}

export function* fetchVirtualServers(action) {
  yield put({ type: VIRTUALSERVERS_FETCHING })
  try {
    const virtualServers = yield call(
      getUrl,
      `/rest/v1/bigip/virtualservers?application=${action.application}&environmentClass=${action.environmentClass}&environmentName=${action.environment}&zone=${action.zone}`
    )
    yield put({ type: VIRTUALSERVERS_RECEIVED, value: virtualServers })
  } catch (err) {
    yield put({ type: VIRTUALSERVERS_REQUEST_FAILED, err })
  }
}

export function* watchOrderData() {
  yield fork(takeEvery, ENVIRONMENTS_REQUEST, fetchEnvironments)
  yield fork(takeEvery, APPLICATIONS_REQUEST, fetchApplications)
  yield fork(takeEvery, RESOURCES_REQUEST, fetchResources)
  yield fork(takeEvery, SCOPED_RESOURCE_REQUEST, fetchScopedResource)
  yield fork(takeEvery, MQCLUSTERS_REQUEST, fetchMqClusters)
  yield fork(takeEvery, DBTEMPLATES_REQUEST, fetchDbTemplates)
  yield fork(takeEvery, VIRTUALSERVERS_REQUEST, fetchVirtualServers)
}
