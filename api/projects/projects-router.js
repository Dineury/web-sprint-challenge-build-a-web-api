// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const { getProjects,getProjectsById } = require('./projects-middleware')
const Project = require('../projects/projects-model') 

router.get('/', getProjects,(req, res, next) => {  //eslint-disable-line 
    res.json(req.projects)
  
} )

router.get('/:id', getProjectsById, (req, res, next) => {  //eslint-disable-line 
  res.json(req.project)
 
} )

router.post('/', async (req, res, next) => {
 try {

  const { name, description } = req.body
  if(!name || !description){
    res.status(400).json({
      message: "name and description required!"
    }) 
  } else {
   Project.insert(req.body)
   .then(newProject => {
     res.status(201).json(newProject)
   })
  }
} catch(err) {
  next(err)
}
 
})

router.put('/:id', getProjectsById, async (req, res, next) => {
 try {const { name, description, completed } = req.body
  if(!name || !description || completed == undefined){
    res.status(400).json({
      message: "Fields can't be Empty!"
    }) 
  }  else {
      Project.update(req.params.id, req.body)
     .then(updatedProject => {
       res.json(updatedProject)
     })
    }
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', getProjectsById, async (req, res, next) => {
  try{
    await Project.remove(req.params.id)
    res.status(204).json()
  }catch(err) {
    next(err)
  }
})

router.get('/:id/actions', getProjectsById, async (req, res, next) => {
  try {
    const actions = await Project.getProjectActions(req.params.id)
    if(actions) {
      res.status(200).json(actions)
    } else {
      res.status(404).json(actions)
    }
  } catch(err) {
    next(next)
  }
})

router.use((err, req, res, next) => { //eslint-disable-line 
res.status(err.status || 500).json({
  customMessage: 'something tragic inside Projects router happened',
  message: err.message,
  stack: err.stack
})
})

module.exports = router