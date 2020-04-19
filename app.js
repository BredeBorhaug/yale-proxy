// include all the different utilities

// getAccessToken and refreshAccessToken
const auth = require(`./utilities/auth`)

// Alarm related endpoints
const alarm = require(`./utilities/alarm`)

// Device related endpoints
const device = require(`./utilities/device`)

module.exports = {
    auth,
    alarm,
    device,
}