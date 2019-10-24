const NO_CONTENT = 204

export const resolveOrigin = () => {
  const url = new URL(window.location.href)
  return url.origin
}

export const getUrl = url => {
  // Small fix so js can fetch data regardless of current browser url
  const origin = resolveOrigin()
  const init = {
    credentials: 'include',
    method: 'GET'
  }
  return fetch(`${origin}${url}`, init).then(async res => {
    if (res.status === NO_CONTENT) {
      return []
    }

    if (res.ok) {
      const json = res.json().then(json => {
        return json
      })
      return json
    } else {
      const errorMessage = await res.text()
      throw `${errorMessage} ( ${res.status} )`
    }
  })
}

export const postForm = (url, form) => {
  let headers = { 'Content-Type': 'application/json' }

  return fetch(url, {
    headers,
    credentials: 'include',
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(form)
  }).then(async res => {
    if (res.ok) {
      const contentLength = res.headers.get('content-length')

      if (contentLength > 0) {
        const json = res.json().then(json => {
          return json
        })
        return json
      }
      return ''
    } else {
      const errorMessage = await res.text()
      throw `Error posting form ${errorMessage} ( ${res.status} ${res.statusText} )`
    }
  })
}

export const isAvailable = (access, roles) => {
  if (!access) return true
  let validAccess = false
  roles.forEach(role => {
    if (access.includes(role)) {
      validAccess = true
    }
  })
  return validAccess
}
