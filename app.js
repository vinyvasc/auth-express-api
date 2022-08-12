const express = require('express')
require('dotenv').config()
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

module.exports = app