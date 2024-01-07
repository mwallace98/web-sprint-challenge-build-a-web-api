const express = require('express');
const server = express();

server.use(express.json());
require('dotenv').config()

const projectsRouter = require('./projects/projects-router')
const ActionsRouter = require('./actions/actions-router')


server.use('/api/projects',projectsRouter)
server.use('/api/actions', ActionsRouter)


server.use("*", (req,res) => {
    res.json('server Running')
})



// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!


module.exports = server;
