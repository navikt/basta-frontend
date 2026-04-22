// AUTHENTICATION CHECK — Nais sidecar injects the Authorization header
exports.ensureAuthenticated = () => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return next()
    }
    res.redirect(`/oauth2/login?redirect=${encodeURIComponent(req.originalUrl)}`)
  }
}
