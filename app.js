const express = require(`express`)
const app = express()
const auth = require(`./api/auth/auth`)
const status = require(`./api/status/status`)

const PORT = 3010

app.use(express.json())

app.use(`/api/auth`, auth.router)
app.use(`/api/status`, status.router)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})