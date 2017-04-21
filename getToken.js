'use strict'
var https = require('https')
var token = null
var logger = require('./logger.js')
var config = require('./config.js')
module.exports = function (req, res, next) {
  if (typeof req.token !== 'undefined' && req.token) {
    req.logger.add('Token exists')
    next()
  } else {
    // set these values to retrieve the oauth token
    var crmorg = config.crmorg
    var clientid = config.clientid
    var username = config.username
    var userpassword = config.userpassword
    var tokenendpoint = config.tokenendpoint

    // setup logger
    req.token = token
    req.logger = logger
    req.logger.add('TOKEN - Begin')

    // remove https from tokenendpoint url
    tokenendpoint = tokenendpoint.toLowerCase().replace('https://', '')

    // get the authorization endpoint host name
    var authhost = tokenendpoint.split('/')[0]

    // get the authorization endpoint path
    var authpath = '/' + tokenendpoint.split('/').slice(1).join('/')

    // build the authorization request
    // if you want to learn more about how tokens work, see IETF RFC 6749 - https://tools.ietf.org/html/rfc6749
    var reqstring = 'client_id=' + clientid
    reqstring += '&resource=' + encodeURIComponent(crmorg)
    reqstring += '&username=' + encodeURIComponent(username)
    reqstring += '&password=' + encodeURIComponent(userpassword)
    reqstring += '&grant_type=password'

    // set the token request parameters
    var tokenrequestoptions = {
      host: authhost,
      path: authpath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(reqstring)
      }
    }

    // make the token request
    var tokenrequest = https.request(tokenrequestoptions, function (response) {
      // make an array to hold the response parts if we get multiple parts
      var responseparts = []
      response.setEncoding('utf8')
      response.on('data', function (chunk) {
        // add each response chunk to the responseparts array for later
        responseparts.push(chunk)
      })
      response.on('end', function () {
        // once we have all the response parts, concatenate the parts into a single string
        var completeresponse = responseparts.join('')
        // console.log('Response: ' + completeresponse);
        console.log('Token response retrieved . . . ')

        // parse the response JSON
        var tokenresponse = JSON.parse(completeresponse)

        // extract the token
        req.token = tokenresponse.access_token
        req.logger.add('TOKEN - End')
        // Go to the next part of the route now that we got all the stuff
        next()
      })
    })

    tokenrequest.on('error', function (e) {
      console.error(e)
    })

    // post the token request data
    tokenrequest.write(reqstring)

    // close the token request
    tokenrequest.end()
  }
}
