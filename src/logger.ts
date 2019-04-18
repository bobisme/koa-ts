import pino = require('pino')
import pinoMiddleware = require('koa-pino-logger')

export const log = pino({
  useLevelLabels: true,
})
export const loggerMiddleware = pinoMiddleware({ logger: log })
