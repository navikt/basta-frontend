import { VMLOOKUP_REQUEST, SUBMIT_OPERATION, CREDENTIAL_LOOKUP_REQUEST } from './operateActionTypes'

export const fetchVmInfo = hostnames => {
  return { type: VMLOOKUP_REQUEST, hostnames }
}

export const submitOperation = (key, form, operation) => {
  return { type: SUBMIT_OPERATION, key, form, operation }
}

export const submitCredentialLookup = form => {
  return { type: CREDENTIAL_LOOKUP_REQUEST, form }
}
