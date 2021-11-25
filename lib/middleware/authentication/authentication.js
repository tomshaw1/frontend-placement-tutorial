// Core dependencies
const url = require('url')

module.exports = function (req, res, next) {

  // Local dependencies
  const config = require('../../../app/config.js')

  // Local variables
  const glitchEnv = (process.env.PROJECT_REMIX_CHAIN) ? 'production' : false // glitch.com
  const env = (process.env.NODE_ENV || glitchEnv || 'development').toLowerCase()
  const useAuth = (process.env.USE_AUTH || config.useAuth).toLowerCase()
  const password = process.env.PASSWORD

  if (env === 'production' && useAuth === 'true') {
    if (!password) {
      console.error('Password is not set.')
      return res.send('<h1>Error:</h1><p>Password not set. <a href="https://govuk-prototype-kit.herokuapp.com/docs/publishing-on-heroku#6-set-a-username-and-password">See guidance for setting a password</a>.</p>')
    }

    // allow the password page to load without authentication
    if (req.path == "/prototype-admin/password" ||
        req.path.startsWith("/public/stylesheets/unbranded")){
      next()
      return
    }

    // check the session is authenticated, if not redirect to the password page
    if (req.session && req.session.authenticated === true){
      next()
      return
    } else {
      const returnURL = url.format({
        pathname: req.path,
        query: req.query
      })
      res.redirect('/prototype-admin/password?returnURL=' + returnURL)
    }

  }
}
