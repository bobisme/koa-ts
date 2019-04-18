import pino = require('pino')
import pinoMiddleware = require('koa-pino-logger')

const options = {
  useLevelLabels: true,
}

export const log = pino(options)
export const loggerMiddleware = pinoMiddleware(options)
