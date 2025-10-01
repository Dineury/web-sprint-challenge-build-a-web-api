const express = require('express');
const server = express();
const projectRouter = require('./projects/projects-router')
// Configure your server here
server.use(express.json())
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
server.use('/api/projects', projectRouter)
// Do NOT `server.listen()` inside this file!


module.exports = server;
