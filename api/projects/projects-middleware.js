// add middlewares here related to projects
const Project = require('../projects/projects-model')


async function getProjects(req, res, next) {
    try {
        const projects = await Project.get()
        if(projects) {
            req.projects = projects
            next()
        } else {
            res.status(404).json()
        }
    } catch(err) {
        next(err)
    }
}

async function getProjectsById(req, res, next) {
   
      try {
        const project = await Project.get(req.params.id)
        if(project) {
            req.project = project
            next()
        } else {
            res.status(404).json()
        }
    } catch(err) {
        next(err)
    }
    
}




module.exports = {
    getProjects,
    getProjectsById
}