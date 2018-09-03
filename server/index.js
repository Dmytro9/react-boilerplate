import http from 'http'
import Koa from 'koa'
import socket from 'socket.io'
import Redis from 'redis'
import bluebird from 'bluebird'

// also bluebird... 

const app = new Koa()

// Redis
bluebird.promisifyAll(Redis.RedisClient.prototype)
bluebird.promisifyAll(Redis.Multi.prototype)
const redis = Redis.createClient()

// redis.set('test', 'redis data')
redis.set('foo', 'foo-value')
redis.del('foo')

app.use(async ctx => {
  // redis.del('foo')
  ctx.body = await redis.getAsync('foo')
  // ctx.body = await x
})


redis.on('connect', () => console.log('Connected to Redis...'))

const server = http.createServer(app.callback())
const io = socket(server)


server.listen(8081, () => {
  console.log('Listening on ', server.address().port)
})

// HGETALL hgetall
// HMSET - hmset
// del()












