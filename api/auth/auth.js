const express = require(`express`)
const router = express.Router()
const request = require(`request`)

const utilities = require(`../../utilities/utilities`)


router.post(`/login`, (req, res) => {
    const token = utilities.getAccessToken(req.headers.username, req.headers.password)
    token.then(function(result) {
        res.json(result)
    })
})

router.post(`/refresh`, (req, res) => {
    const token = utilities.refreshAccessToken(req.headers.refresh_token)
    token.then(function(result) {
        res.json(result)
    })
})



module.exports = { router }