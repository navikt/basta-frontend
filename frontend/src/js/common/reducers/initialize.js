import { APPLICATION_READY } from '../../actionTypes'

export default (
  state = {
    appReady: false
  },
  action
) => {
  switch (action.type) {
    // APPLICATION_READY

    case APPLICATION_READY:
      return {
        ...state,
        appReady: true
      }
    default:
      return state
  }
}
