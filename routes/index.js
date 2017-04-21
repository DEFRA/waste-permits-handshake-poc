'use strict'
var express = require('express')
var router = express.Router()
var getToken = require('../getToken.js')
var contacts = require('../contacts.js')

router.use(getToken)

router.get('/', contacts.get, function (req, res) {
  res.render('index', { token: req.token, contacts: req.contacts, log: req.logger.getLog() })
})

router.post('/', contacts.post, contacts.get, function (req, res) {
  res.render('index', { token: req.token, contacts: req.contacts, log: req.logger.getLog() })
})

module.exports = router
