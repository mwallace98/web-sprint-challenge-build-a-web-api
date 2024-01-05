// Write your "projects" router here!

const express = require('express');
const Adopter = require('./projects-model')
const router = express.Router()


router.get('/', (req,res)=> {

    Adopter.get()
    .then(projects => {
        if(projects){
            res.json(projects)
        }else {
            res.status(404).json({message: "Projects not found"})
        } 
    })
    .catch(err => {
        console.log(err)
    });
});

router.get('/:id', (req,res)=> {
    const {id} = req.params
    Adopter.get(id)
   .then(projects => {
    if(projects){
        res.json(projects)
    }else{
        res.status(404).json({
            message: 'Projects not found'
        })
    }
   })
   .catch(err => {
    console.log(err)
   })
})

router.post('/', (req,res)=> {

    const projectData = req.body
    if(!projectData || !projectData.name || !projectData.description){
        res.status(400).json({error: 'name and description are required'})
        return
    }

    Adopter.insert(projectData)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'error'})
    })
})

router.put('/:id', async (req,res)=> {
    try {
        const { id } = req.params;
        const changes = req.body;
        console.log(changes);
    
        if (!changes || !changes.name || !changes.description || changes.completed === undefined) {
          return res.status(400).json({ error: 'missing required fields' });
        }
    
        const updatedProject = await Adopter.update(id, changes);
    
        if (updatedProject) {
          res.json(updatedProject);
        } else {
          res.status(404).json({ message: 'project not found' });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: 'error updating',
          message: error.message,
        });
      }
    });


router.delete('/:id', (req,res)=> {
    res.json({message: "DELETE Request for Projects"})
})

router.get('/:id/actions', (req,res)=> {
    res.json({message: "GET Request with ID for Projects"})
})

module.exports = router