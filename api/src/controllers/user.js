// USER SESSION

exports.getUserProfile = () => {
  return async (req, res) => {
    const user = {
      userName: req.session.upn,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      displayName: req.session.displayName,
      roles: req.session.roles
    }
    res.status(200).send(user)
  }
}

exports.userSessionLookup = () => {
  return (req, res) => {
    res.status(200).send({
      session: 'active'
    })
  }
}
