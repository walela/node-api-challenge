const express = require('express')
const projectDb = require('./data/helpers/projectModel')

const router = express.Router()

const validateProject = (req, res, next) => {
  if (Object.keys(req.body).length) {
    const { name, description } = req.body
    if (name && description) {
      next()
    } else {
      res.status(400).json({ message: 'Project name and description required' })
    }
  } else {
    res.status(400).json({ message: 'Missing project request body' })
  }
}

const validateProjectId = (req, res, next) => {
  const { id } = req.params

  projectDb
    .get(id)
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
}

router.get('/', (_, res, next) => {
  projectDb
    .get()
    .then(projects => {
      res.status(200).send(projects)
    })
    .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
  const { id } = req.params

  projectDb
    .getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(next)
})

router.post('/', validateProject, (req, res, next) => {
  projectDb
    .insert(req.body)
    .then(projects => {
      res.status(201).json(projects)
    })
    .catch(next)
})

router.put('/:id', validateProject, (req, res, next) => {
  const { id } = req.params

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
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
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
          message: `Successfully deleted project with id ${id}.`
        })
      }
    })
    .catch(next)
})

router.use((error, req, res) => {
  res.status(500).json({
    file: 'projectRouter',
    method: req.method,
    url: req.url,
    message: error.message
  })
})

module.exports = router
