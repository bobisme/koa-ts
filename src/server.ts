import { ZpagesExporter } from '@opencensus/exporter-zpages'
import * as tracing from '@opencensus/nodejs'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import koaOpentracing = require('koa-opentracing')
import { log, loggerMiddleware } from './logger'
import * as views from 'koa-views'

// Add your zipkin url and application name to the Zipkin options
const exporter = new ZpagesExporter({
  port: 4567,
  startServer: true,
  spanNames: [],
})
tracing.registerExporter(exporter).start({ logger: log })

const app = new Koa()
koaOpentracing(app, {
  appname: 'login',
  logger: [{ log: log.debug }],
})
app.use(loggerMiddleware)

app.use(
  views(__dirname + '/views', {
    map: { ect: 'ect' },
  })
)

const router = new Router()

router.get('/', async ctx => {
  ctx.log.info({ greeting: 'hello' }, 'saying hello')
  ctx.body = 'Hello World!'
})
router.get('/hi', async ctx => {
  await ctx.render('hi.ect')
})

app.use(router.routes())

app.listen(3000)

log.info('Server running on port 3000')
