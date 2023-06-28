import z from 'zod'

const weatherReportScheme = z.object({
  temperature: z.number(),
  humidity: z.number().min(0).max(1),
})

export { weatherReportScheme }
export type WeatherReport = z.infer<typeof weatherReportScheme>
