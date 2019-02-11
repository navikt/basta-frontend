import { VMLOOKUP_REQUEST, SUBMIT_OPERATION } from './operateActionTypes'

export const fetchVmInfo = hostnames => {
  return { type: VMLOOKUP_REQUEST, hostnames }
}

export const submitOperation = (key, form, operation) => {
  return { type: SUBMIT_OPERATION, key, form, operation }
}
