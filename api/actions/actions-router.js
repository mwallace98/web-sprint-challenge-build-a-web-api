// Write your "actions" router here!

const express = require('express');
const Adopter = require('./actions-model')
const router = express.Router()

router.get('/', (req,res)=> {
    Adopter.get()
    .then(actions => {
        if(actions){
            res.json(actions)
        } else {
            res.status(404).json([])
        }
    })
    .catch()
});

router.get('/:id', async (req,res)=> {
    try{
        const {id} = req.params
        const actions = await Adopter.get(id)
        if(!actions){
            res.status(404).json({
                message:'ID not found'
            })
        }else {
            res.json(actions)
        }
    } catch (error){
        res.status(500).json({
            message: 'error'
        })
    }
});

router.post('/',  (req,res)=> {
        const newActionData = req.body
        if(!newActionData ||!newActionData.project_id || !newActionData.description || !newActionData.notes){
        return res.status(400).json({ error: 'missing required fields' });
       }

       Adopter.insert(newActionData)
       .then(newAction => {
        res.status(201).json(newAction)
       })
       .catch((err => {
        console.log(err)
        res.status(500).json({err: 'error'})
    }))
    
    
});
router.put('/:id', (req,res)=> {
    
});
router.delete('/:id', (req,res)=> {
    
});


module.exports = router