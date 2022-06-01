const amplitude = require('amplitude-js')
export function initAmplitude() {
  if (amplitude) {
    amplitude.default
      .getInstance()
      .init(
        document.domain === 'basta.intern.nav.no'
          ? '16d1ee2fd894ca2562eeebb5095dbcf0'
          : '04203d48401492bda4620a74acf85a5b',
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
