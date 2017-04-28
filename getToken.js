'use strict'
// var https = require('https')
var token = null
var logger = require('./logger.js')
var config = require('./config.js')
var adal = require('adal-node')

module.exports = function (req, res, next) {
  if (typeof req.token !== 'undefined' && req.token) {
    req.logger.add('Token exists')
    next()
  } else {
    // setup logger
    req.token = token
    req.logger = logger
    req.logger.add('TOKEN - Begin')

    var AuthenticationContext = adal.AuthenticationContext
    var authorityUrl = 'https://login.windows.net/' + config.tenant
    var context = new AuthenticationContext(authorityUrl)

    context.acquireTokenWithUsernamePassword(
      config.crmorg,
      config.username,
      config.userpassword,
      config.clientid,
      function (err, tokenResponse) {
        if (err) {
          console.log('well that didn\'t work: ' + err.stack)
        } else {
          console.log(tokenResponse)
          req.token = tokenResponse.accessToken
          req.logger.add('TOKEN - End')
          // Go to the next part of the route now that we got all the stuff
          next()
        }
      }
    )
  }
}
