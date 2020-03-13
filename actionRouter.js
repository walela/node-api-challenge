const express = require('express')
const actionDb = require('./data/helpers/actionModel')
const projectDb = require('./data/helpers/projectModel')

const router = express.Router()

router.get('/', (req, res, next) => {
  actionDb
    .get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(next)
})

router.post('/', validateProjectId, (req, res, next) => {
  actionDb
    .insert(req.body)
    .then(actions => {
      res.status(201).json(actions)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, (req, res, next) => {
  const { id } = req.params

  actionDb
    .update(id, req.body)
    .then(action => {
      if (action) {
        res.status(200).json(action)
      } else {
        res
          .status(404)
          .json({ message: 'The action with the specified ID does not exist.' })
      }
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params

  actionDb
    .remove(id)
    .then(num => {
      if (num === 0) {
        res
          .status(404)
          .json({ message: 'The action with the specified ID does not exist.' })
      } else {
        res.status(200).json({
          message: `You've deleted project with id ${id}, successfully`
        })
      }
    })
    .catch(next)
})

function validateProjectId(req, res, next) {
  if (Object.keys(req.body).length) {
    const { project_id, notes, description } = req.body

    if (project_id && notes && description) {
      projectDb
        .get(project_id)
        .then(project => {
          if (project) {
            next()
          } else {
            res.status(404).json({
              message: 'The project with the specified ID does not exist.'
            })
          }
        })
        .catch(next)
    } else {
      res
        .status(400)
        .json({ message: 'Action notes, project ID and description required' })
    }
  } else {
    res.status(400).json({ message: 'Missing action request body' })
  }
}

router.use((error, req, res) => {
  res.status(500).json({
    file: 'actionRouter',
    method: req.method,
    url: req.url,
    message: error.message
  })
})

module.exports = router
