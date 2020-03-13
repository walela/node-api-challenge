const express = require('express')
const cors = require('cors')

const server = express()

const logger = (req, _, next) => {
    const datetime = new Date().toGMTString()
    console.log(`${req.method} ${req.url} ${datetime}`)
    next()
  }

server.use(express.json())
server.use(cors())
server.use(logger)

server.get('/', (req, res) => {
  res.send('<h1>Hello 😈!</h1>')
})

module.exports = server
