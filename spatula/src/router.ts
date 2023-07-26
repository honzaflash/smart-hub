import { SmartHubConfigScheme, weatherReportScheme } from './apiScheme'
import { fileReaderHandler, proxyCallHandler } from './handlers'
import { router, publicProcedure } from './trpc'

const buildPlateConfig = (config: SmartHubConfigScheme) => ({
  modules: Object.fromEntries(
    config.modules.map((module) => [module.name, {
      endpoint: `trpc/${module.endpoint}`,
    }]),
  ),
})

const buildProcedures = (modules: SmartHubConfigScheme['modules']) => Object.fromEntries(
  modules.map((module) => [
    module.endpoint,
    publicProcedure.query(() => (module.dataSource.type === 'file' ? fileReaderHandler : proxyCallHandler)(module.dataSource.path)),
  ]),
)

export const getAppRouter = (config: SmartHubConfigScheme) => router({
  getPlateConfig: publicProcedure.query(() => buildPlateConfig(config)),
  // getWeatherReport: publicProcedure.output(weatherReportScheme).query(()  => ({ temperature: 1, humidity: 0.5 })),
  ...buildProcedures(config.modules),
})
