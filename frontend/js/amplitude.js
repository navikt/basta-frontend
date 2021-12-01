const amplitude = require('amplitude-js')
export function initAmplitude() {
  if (amplitude) {
    amplitude.default
      .getInstance()
      .init(
        document.domain === 'basta.intern.nav.no'
          ? '487ae1d6430543123d5da2c3467d0844'
          : '69f900cf5fe06368af2469ca4cf1f927',
        '',
        {
          apiEndpoint: 'amplitude.nav.no/collect',
          saveEvents: false,
          includeUtm: true,
          includeReferrer: true,
          platform: window.location.toString()
        }
      )
  }
}

function logAmplitudeEvent(eventName, eventData) {
  setTimeout(() => {
    try {
      if (amplitude) {
        amplitude.default.getInstance().logEvent(eventName, eventData)
      }
    } catch (error) {
      console.error(error)
    }
  })
}

export function logPageView(path) {
  logAmplitudeEvent('pageview', {
    path: path
  })
}
