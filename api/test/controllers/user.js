// USER SESSION

exports.getUserProfile = () => {
  return (req, res) => {
    const user = {
      userName: 'mockuser@mockdomain.com',
      firstName: 'Mock',
      lastName: 'User',
      displayName: 'mockuser@nmockdomain.com',
      roles: ['ROLE_PROD_OPERATIONS', 'ROLE_SUPERUSER']
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
