import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './router'
import { env } from 'process'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const PORT = env.SPATULA_PORT

const app = express()

/* setup CORS */
const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
  ],
  allowedHeaders: [
    'Content-Type',
  ],
}
app.use(cors(corsOpts))
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
)

app.listen(PORT)
console.log(`listening on ${PORT}`)
