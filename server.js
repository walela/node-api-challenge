const express = require('express')
const cors = require('cors')
const projectDb = require('./data/helpers/projectModel')
const actionDb = require('./data/helpers/actionModel')

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

server.get('/api/projects', (req, res) => {
  projectDb.get().then(projects => {
    res.json(projects)
  })
})

server.post('/api/projects', (req, res) => {
  const { name, description } = req.body

  if (!name || !description) {
    res.status(400).json({
      errorMessage: 'Please provide a name and description for the project.'
    })
  } else {
    projectDb
      .insert(req.body)
      .then(projects => {
        res.status(201).json(projects)
      })
      .catch(() => {
        res.status(500).json({
          error: 'There was an error while saving the project to the database'
        })
      })
  }
})

server.put('/api/projects/:id', (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  if (!name || !description) {
    res.status(400).json({
      errorMessage: 'Please provide a name and description for the project.'
    })
  } else {
    projectDb
      .update(id, req.body)
      .then(project => {
        if (project) {
          res.status(200).json(project)
        } else {
          res.status(404).json({
            message: 'The project with the specified ID does not exist.'
          })
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'The project information could not be modified.' })
      })
  }
})

server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params

  projectDb
    .remove(id)
    .then(num => {
      if (num === 0) {
        res.status(404).json({
          message: 'The project with the specified ID does not exist.'
        })
      } else {
        res.status(200).json({
          message: `Successfully deleted project with id ${id}`
        })
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The project could not be removed' })
    })
})

module.exports = server
