const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const projectRouter = require('./projectRouter')
const actionRouter = require('./actionRouter')

const server = express()

const logger = (req, _, next) => {
  const datetime = new Date().toGMTString()
  console.log(`${req.method} ${req.url} ${datetime}`)
  next()
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(logger)
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (_, res) => {
  res.send('<h1>Hello, there!</h1>')
})

server.all('*', (_, res) => {
  res.status(404).send('<h2>404 - Page not found</h2>')
})

module.exports = server
