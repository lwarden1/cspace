import { env } from 'process'
import cookieSession from 'cookie-session'
import express, { Request, Response, RequestHandler } from 'express'
import api from './api'
import { validateUser } from './utils';
import ViteExpress from 'vite-express';
import cors from 'cors';

// load .env variables
require('dotenv').config()

// setup express
const app = express()
const port = env.PORT ? Number.parseInt(env.PORT) : 3000
ViteExpress.config({
    mode: (env.NODE_ENV as "development" | "production" | undefined) || 'development',
})

// setup cors
app.use(cors({
    origin: env.CORS_ORIGIN || `http://localhost:${port}`,
    credentials: true,
}))

// set up cookie session
app.use(cookieSession({
    secret: env.SECRET || 'secret',
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: true,
}))

app.use('/api', api)

// handle user validation for client to avoid unnecessary requests to the server
app.use(validateUser)

ViteExpress.listen(app, port, () => { console.log(`CSpace listening on port ${port}`) })
