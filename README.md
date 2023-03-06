# CSpace

An Express server with a React client, all in one repo with typescript.

## Commands

- Install all dependencies - `npm i`
- Start the application in development mode (with hot reload) - `npm run dev`
- Start the application in production mode - `npm start`
- Regenerate the Prisma client - `npm run prisma:regen`
- Regenerate the global types - `npm run types`

## Client

Using React because it's **definitely** the best framework for building web applications and it's **definitely** not complete overkill for this project 😊.

Using vite for building because we need to offset the **amazingness** of React somehow.

## Server

Basic Express server with a few middleware packages. We definitely couldn't use ejs because it's **definitely** not the best templating engine for the job.

Literally just serving the client files and the API.

## Database

Using Prisma because it's **definitely** not overkill for this project 😊.

Using SQLite to keep things as simple as possible and to maybe *not* use an external database 😊.

## Authentication

Literally just a cookie-session cookie, no security whatsoever 😊.
