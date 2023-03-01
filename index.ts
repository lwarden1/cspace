import './prisma'
import { env } from 'process'
import cookieSession from 'cookie-session'
import express from 'express'

// load .env variables
require('dotenv').config()

// setup express
const app = express()
const port = env.PORT ? Number.parseInt(env.PORT) : 3000

// set up cookie session
app.use(cookieSession({
    secret: env.SECRET || 'secret',
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const utils = require('./utils')

const routes = require('./routes')

app.use(routes)

app.listen(port, () => {
    console.log(`CSpace listening on port ${port}`)
})
