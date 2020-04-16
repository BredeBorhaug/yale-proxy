const express = require(`express`)
const router = express.Router()
const request = require(`request`)

const utilities = require(`../../utilities/utilities`)


router.get(`/getDeviceStatus`, (req, res) => {
    const status = utilities.getDeviceStatus(req.headers.access_token)
    status.then(function(result) {
        res.json(result)
    })
})

router.get(`/getAlarmStatus`, (req, res) => {
    const status = utilities.getAlarmStatus(req.headers.access_token)
    status.then(function(result) {
        res.json(result)
    })
})



module.exports = { router }