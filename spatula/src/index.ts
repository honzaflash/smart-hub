import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './router'
import { env } from 'process'
import dotenv from 'dotenv'

dotenv.config()

const PORT = env.SPATULA_PORT

const app = express()
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
)

app.listen(PORT)
console.log(`listening on ${PORT}`)
