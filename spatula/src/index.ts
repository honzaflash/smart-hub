import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { getAppRouter } from './router'
import { env } from 'process'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import config from '../hub-config.json'
import { smartHubConfigScheme } from './apiScheme'

dotenv.config()
const { PLATE_BUILD_PATH, SPATULA_PORT } = env

const validatedConfig = smartHubConfigScheme.parse(config)

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

/* serve the Plate app  *i n c e p t i o n* */
if (PLATE_BUILD_PATH != null) {
  app.use(express.static(PLATE_BUILD_PATH))
  app.get('/', (_req, res) => res.sendFile(path.join(PLATE_BUILD_PATH, 'index.html')))
}

/* tRPC endpoint */
const appRouter = getAppRouter(validatedConfig)
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
)

app.listen(SPATULA_PORT)
console.log(`listening on ${SPATULA_PORT}`)

export type AppRouter = typeof appRouter
