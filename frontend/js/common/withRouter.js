import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'

export const withRouter = (Component) => {
  const Wrapped = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const history = {
      push: (to) => navigate(to),
      replace: (to) => navigate(to, { replace: true }),
      goBack: () => navigate(-1),
      go: (n) => navigate(n),
      location,
    }
    return <Component {...props} history={history} match={{ params }} location={location} />
  }
  Wrapped.displayName = `withRouter(${Component.displayName || Component.name || 'Component'})`
  return Wrapped
}

export default withRouter
