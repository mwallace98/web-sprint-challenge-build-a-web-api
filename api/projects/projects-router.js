// Write your "projects" router here!

const express = require('express');
const router = express.Router()


router.get('/projects', (req,res)=> {
    res.json({message: "GET Request for Projects"})
})



module.exports = router