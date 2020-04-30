import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl } from '../utils'
import { groupQueueManagersByName } from '../mqUtils'
import {
  MQCLUSTERS_REQUEST,
  MQCLUSTERS_FETCHING,
  MQQUEUES_REQUEST_FAILED,
  MQQUEUES_RECEIVED,
  MQCLUSTERS_REQUEST_FAILED,
  MQCLUSTERS_RECEIVED,
  MQQUEUES_FETCHING,
  MQ_QUEUE_MANAGERS_REQUEST,
  MQ_QUEUE_MANAGERS_FETCHING,
  MQ_QUEUE_MANAGERS_REQUEST_FAILED,
  MQ_QUEUE_MANAGERS_RECEIVED,
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
  VIRTUALSERVERS_RECEIVED,
  CERTIFICATE_FASIT_RECEIVED,
  CERTIFICATE_FASIT_REQUEST,
  CERTIFICATE_FASIT_REQUEST_FAILED,
  MQQUEUES_REQUEST
} from '../../actionTypes'

export function* fetchQueueManagers(action) {
  yield put({ type: MQ_QUEUE_MANAGERS_FETCHING })
  try {
    let queueManagers = yield call(
      getUrl,
      `/rest/v2/fasit/resources?environmentclass=${action.envClass}&type=queuemanager`
    )
    const distinctQueueManagers = yield call(
      groupQueueManagersByName,
      queueManagers,
      action.envName
    )
    yield put({ type: MQ_QUEUE_MANAGERS_RECEIVED, value: distinctQueueManagers })
  } catch (err) {
    yield put({ type: MQ_QUEUE_MANAGERS_REQUEST_FAILED, error: err })
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

// https://basta-api.adeo.no/rest/v1/mq/queuenames?environmentClass=t&queueManager=mq://qmgrsHostname:qmgrPort/qmgrName
export function* fetchMqQueues(action) {
  yield put({ type: MQQUEUES_FETCHING })
  try {
    let resources = yield call(
      getUrl,
      `/rest/v1/mq/queuenames?environmentClass=${
        action.environmentClass
      }&queueManager=${encodeURIComponent(action.queueManager)}`
    )
    yield put({ type: MQQUEUES_RECEIVED, value: resources })
  } catch (err) {
    yield put({ type: MQQUEUES_REQUEST_FAILED, err })
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
    yield put({ type: DBTEMPLATES_REQUEST_FAILED, error: err })
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
  } catch (error) {
    yield put({
      type: VIRTUALSERVERS_REQUEST_FAILED,
      error: `Failed fetching virtual server list. ${error} `
    })
  }
}

export function* certificateExistInFasit(action) {
  try {
    let certificateExists = yield call(
      getUrl,
      `/rest/orders/serviceuser/certificate/existInFasit?application=${action.application}&environmentClass=${action.environmentClass}&zone=${action.zone}`
    )
    yield put({ type: CERTIFICATE_FASIT_RECEIVED, value: certificateExists })
  } catch (err) {
    yield put({ type: CERTIFICATE_FASIT_REQUEST_FAILED, err })
  }
}

export function* watchOrderData() {
  yield fork(takeEvery, ENVIRONMENTS_REQUEST, fetchEnvironments)
  yield fork(takeEvery, APPLICATIONS_REQUEST, fetchApplications)
  yield fork(takeEvery, MQ_QUEUE_MANAGERS_REQUEST, fetchQueueManagers)
  yield fork(takeEvery, MQCLUSTERS_REQUEST, fetchMqClusters)
  yield fork(takeEvery, MQQUEUES_REQUEST, fetchMqQueues)
  yield fork(takeEvery, DBTEMPLATES_REQUEST, fetchDbTemplates)
  yield fork(takeEvery, VIRTUALSERVERS_REQUEST, fetchVirtualServers)
  yield fork(takeEvery, CERTIFICATE_FASIT_REQUEST, certificateExistInFasit)
}
