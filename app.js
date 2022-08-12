const express = require('express')
require('dotenv').config()
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerJSDoc = require('swagger-jsdoc')
const app = express()
const port = process.env.PORT || 3000
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`

const specs = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authentication API',
            version: '1.0.0',
            description: 'An express api for authentication'
        }
    },
    apis: ['./src/routes/*.js']
})

app.use('/', swaggerUI.serve, swaggerUI.setup(specs))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

module.exports = app