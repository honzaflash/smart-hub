
import type { AppRouter } from '../../spatula/src/router'
import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'

export const trpc = createTRPCReact<AppRouter>()
export const trpcClient = trpc.createClient({links: [httpBatchLink({ url: 'http://localhost:3141/trpc' })]})
