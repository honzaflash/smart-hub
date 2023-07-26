import z from 'zod'

export const smartHubConfigScheme = z.object({
  spatulaPort: z.number().positive(),
  plateBuildPath: z.string(),
  modules: z.array(z.object({
    name: z.string(),
    endpoint: z.string().regex(/\w+/, { message: 'Endpoint name must be alphanumeric' }),
    dataSource: z.discriminatedUnion('type', [
      z.object({ type: z.literal('file'), path: z.string() }),
      z.object({ type: z.literal('network'), path: z.string().url() }),
    ]),
  })),
})

export type SmartHubConfigScheme = z.infer<typeof smartHubConfigScheme>

export const weatherReportScheme = z.object({
  temperature: z.number(),
  humidity: z.number().min(0).max(1),
})

export type WeatherReport = z.infer<typeof weatherReportScheme>
