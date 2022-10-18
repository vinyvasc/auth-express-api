

const { Sequelize } = require('sequelize')
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME

const sequelize = new Sequelize(
    `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
)

module.exports = { sequelize, Sequelize }

