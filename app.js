const express = require('express')
require('dotenv').config()
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const port = process.env.PORT || 3000
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`
const loginRouter = require('./routes/login.js')

//swagger config
const specs = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authentication API',
            version: '1.0.0',
            description: 'An express api for authentication'
        },servers: [
			{
				url: `http://localhost:${port}`,
			},
		],
    },
    apis: ['./routes/*.js']
})

const app = express()

app.get('/', (req, res) => res.redirect('/api'))


app.use('/api', swaggerUI.serve, swaggerUI.setup(specs))

//middlewares
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//registered routes
app.use("/login", loginRouter)


app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
