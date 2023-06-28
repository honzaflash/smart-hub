import { initTRPC } from '@trpc/server'

export const trpc = initTRPC.create()

export const router = trpc.router
export const middleWeare = trpc.middleware
export const publicProcedure = trpc.procedure
