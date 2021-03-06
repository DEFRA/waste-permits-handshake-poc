require('dotenv').config({silent: true})

var config = {}

config.crmwebapihost = process.env.CRM_WEB_API_HOST
config.crmwebapipath = process.env.CRM_WEB_API_PATH

// https://CRMORG...dynamics.com
config.crmorg = process.env.CRM_ORG
// Client ID for App registered with Azure AD
config.clientid = process.env.CRM_CLIENT_ID
// CRM Username
config.username = process.env.CRM_USERNAME
// CRM Password
config.userpassword = process.env.CRM_PASSWORD
// OAuth token endpoint for App registered with Azure AD
config.tokenendpoint = process.env.CRM_TOKEN_ENDPOINT
// CRM Tenant e.g. mycrminstance.onmicrosoft.com
config.tenant = process.env.CRM_TENANT

module.exports = config
