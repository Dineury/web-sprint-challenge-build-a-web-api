// add middlewares here related to actions
const Action = require('./actions-model');


async function getActions(req, res, next) {
    try {
        const actions = await Action.get()
        if(actions) {
            req.actions = actions
            next()
        } else {
            res.status(404).json()
        }
    } catch(err) {
        next(err)
    }
}

async function getActionsById(req, res, next) {
   
      try {
        const action = await Action.get(req.params.id)
        if(action) {
            req.action = action
            next()
        } else {
            res.status(404).json()
        }
    } catch(err) {
        next(err)
    }
    
}


module.exports = {
    getActions,
    getActionsById
}