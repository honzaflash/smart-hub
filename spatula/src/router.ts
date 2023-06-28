import { weatherReportScheme } from './apiScheme'
import { router, publicProcedure } from './trpc'

export const appRouter = router({
  getWeatherReport: publicProcedure.output(weatherReportScheme).query(()  => ({ temperature: 1, humidity: 0.5 })),
})

export type AppRouter = typeof appRouter
