import { SUBMIT_OPERATION, CREDENTIAL_LOOKUP_REQUEST, CUSTOM_CREDENTIAL_LOOKUP_REQUEST } from '../actionTypes'

export const submitOperation = (key, form, operation) => {
  return { type: SUBMIT_OPERATION, key, form, operation }
}

export const submitCredentialLookup = form => {
  return { type: CREDENTIAL_LOOKUP_REQUEST, form }
}

export const submitCustomCredentialLookup = form => {
    return { type: CUSTOM_CREDENTIAL_LOOKUP_REQUEST, form}
}
