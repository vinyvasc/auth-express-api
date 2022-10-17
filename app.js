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
const { Sequelize } = require('sequelize')
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME

const sequelize = new Sequelize(
    `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
)

async function testDbConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

testDbConnection();

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

module.exports = { sequelize }