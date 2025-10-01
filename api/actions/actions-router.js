// Write your "actions" router here!
const express = require('express');
const router = express.Router()
const { getActions, getActionsById } = require('./actions-middleware')
const Action = require('./actions-model')

router.get('/', getActions, (req, res, next) => {
    res.json(req.actions)
})

router.get('/:id', getActionsById, (req, res, next) => {
    res.json(req.action)
   
})

router.post('/',  async (req, res, next) => {
try {
   
  const { project_id, description, notes } = req.body
  if(!project_id || !description || !notes){
    res.status(400).json({
      message: "description and notes required!"
    }) 
  } else {
   Action.insert(req.body)
   .then(newAction => {
     res.status(201).json(newAction)
   })
  }
} catch(err) {
  next(err)
}
})

router.put('/:id', getActionsById, async(req, res, next) => {
 try {
  const { project_id, description, notes } = req.body
  if(!project_id || !description || !notes ){
    res.status(400).json({
      message: "Fields can't be Empty!"
    }) 
  }  else {
      Action.update(req.params.id, req.body)
     .then(updatedAction => {
       res.json(updatedAction)
     })
    }
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', getActionsById, async (req, res, next) => {
  try{
    await Action.remove(req.params.id)
    res.status(204).json()
  }catch(err) {
    next(err)
  }
})


router.use((err, req, res, next) => { //eslint-disable-line 
res.status(err.status || 500).json({
  customMessage: 'something tragic inside actions router happened',
  message: err.message,
  stack: err.stack
})
})

module.exports = router