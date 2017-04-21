'use strict'
var https = require('https')
var config = require('./config.js')

var Contacts = function () { }

Contacts.prototype.get = function (req, res, next) {
  req.logger.add('GET - Begin')

  // set these values to query your crm data
  var crmwebapihost = config.crmwebapihost
  var crmwebapipath = config.crmwebapipath + 'contacts?$select=fullname,contactid' // basic query to select contacts

  // set the web api request headers
  var requestheaders = {
    'Authorization': 'Bearer ' + req.token,
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Prefer': 'odata.maxpagesize=500',
    'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue'
  }

  // set the crm request parameters
  var crmrequestoptions = {
    host: crmwebapihost,
    path: crmwebapipath,
    method: 'GET',
    headers: requestheaders
  }

  // make the web api request
  var crmrequest = https.request(crmrequestoptions, function (response) {
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

      // parse the response JSON
      req.contacts = JSON.parse(completeresponse).value

      // Go to the next part of route now that we got all the stuff
      req.logger.add('GET - End')
      next()
    })
  })
  crmrequest.on('error', function (e) {
    console.error(e)
  })

  // close the web api request
  crmrequest.end()
}

Contacts.prototype.post = function (req, res, next) {
  if (req.body._method === 'PATCH') {
    patch(req, res, next) // UPDATE
  } else if (req.body._method === 'DELETE') {
    remove(req, res, next) // DELETE
  } else {
    post(req, res, next) // CREATE
  }
}

function post (req, res, next) {
  req.logger.add('CREATE - Begin')

  var contactObj = {}
  contactObj['firstname'] = req.body.firstname
  contactObj['lastname'] = req.body.lastname
  var requestdata = JSON.stringify(contactObj)
  var contentlength = Buffer.byteLength(JSON.stringify(contactObj))

  // set the crm request parameters and headers
  var crmrequestoptions = {
    path: config.crmwebapipath + 'contacts',
    host: config.crmwebapihost,
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + req.token,
      'Content-Type': 'application/json',
      'Content-Length': contentlength,
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0'
    }
  }

  // make the web api request
  var crmrequest = https.request(crmrequestoptions, function (response) {
    // make an array to hold the response parts if we get multiple parts
    var responseparts = []
    // response.setEncoding('utf8');
    response.on('data', function (chunk) {
      // add each response chunk to the responseparts array for later
      responseparts.push(chunk)
    })
    response.on('end', function () {
      req.logger.add('CREATE - End')
      next()
    })
  })
  crmrequest.on('error', function (e) {
    console.error(e)
  })

  // send the data to update
  crmrequest.write(requestdata)

  // close the web api request
  crmrequest.end()
}

function patch (req, res, next) {
  req.logger.add('UPDATE - Begin')

  var contactObj = {}
  contactObj['firstname'] = req.body.firstname
  contactObj['lastname'] = req.body.lastname
  var requestdata = JSON.stringify(contactObj)
  var contentlength = Buffer.byteLength(JSON.stringify(contactObj))

  // set the crm request parameters and headers
  var crmrequestoptions = {
    path: config.crmwebapipath + 'contacts(' + req.body.contactid + ')',
    host: config.crmwebapihost,
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ' + req.token,
      'Content-Type': 'application/json',
      'Content-Length': contentlength,
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0'
    }
  }

  // make the web api request
  var crmrequest = https.request(crmrequestoptions, function (response) {
    // make an array to hold the response parts if we get multiple parts
    var responseparts = []
    // response.setEncoding('utf8');
    response.on('data', function (chunk) {
      // add each response chunk to the responseparts array for later
      responseparts.push(chunk)
    })
    response.on('end', function () {
      req.logger.add('UPDATE - End')
      next()
    })
  })
  crmrequest.on('error', function (e) {
    console.error(e)
  })

  // send the data to update
  crmrequest.write(requestdata)

  // close the web api request
  crmrequest.end()
}

function remove (req, res, next) {
  req.logger.add('DELETE - Begin')

  // set the crm request parameters and headers
  var crmrequestoptions = {
    path: config.crmwebapipath + 'contacts(' + req.body.contactid + ')',
    host: config.crmwebapihost,
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + req.token,
      'Content-Type': 'application/json',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0'
    }
  }

  // make the web api request
  var crmrequest = https.request(crmrequestoptions, function (response) {
    // make an array to hold the response parts if we get multiple parts
    var responseparts = []
    // response.setEncoding('utf8');
    response.on('data', function (chunk) {
      // add each response chunk to the responseparts array for later
      responseparts.push(chunk)
    })
    response.on('end', function () {
      req.logger.add('DELETE - End')
      next()
    })
  })
  crmrequest.on('error', function (e) {
    console.error(e)
  })

  // close the web api request
  crmrequest.end()
}

module.exports = new Contacts()
