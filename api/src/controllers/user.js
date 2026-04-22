const getroles = require('./getroles')

exports.getUserProfile = () => {
  return (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized')
    }
    const user = {
      userName: req.user.preferred_username || req.user.NAVident,
      displayName: req.user.name,
      NAVident: req.user.NAVident,
      roles: getroles.matchRoles(req.user.groups || []),
    }
    res.status(200).send(user)
  }
}

exports.userSessionLookup = () => {
  return (req, res) => {
    res.status(200).send({ session: 'active' })
  }
}
