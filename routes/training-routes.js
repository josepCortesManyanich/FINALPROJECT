const router = require('express').Router();
const Training = require('../models/Training');


// @route   GET /api/v1/training
router.get('/', async(req, res, next) => {
    try {
        const trainings= await Training.find({});
         if (!trainings) {
        next(new ErrorResponse('No trainings found', 404));}
        res.status(200).json({ data: trainings })
    } 
    catch (error) {
        console.error(error)
        next(error)
    }
});


// @route   POST /api/v1/training
router.post('/', async(req,res,next) => {
    const {name, image, date} = req.body
    
    
    try {
        const newtraining= {name, image, date }
        const training= await Training.create(newtraining)
        if (!training) {
            next(new ErrorResponse('An error ocurred while creating training', 500));
          }
          res.status(201).json({data: training})

    } catch (error) {
        console.error(error)
        next(error)
        
    }
});

router.get('/:id', async (req,res,next) => {
    const {id} = req.params
    try {
        const training= await Training.findById(id)
        if (!training) {
            next(new ErrorResponse(`An error ocurred while finding ${id} training`, 500));
          }
          res.status(200).json({ data: trainings })
          

    } catch (error) {
        console.error(error)
        next(error)        
    }
});

router.put('/:id', async(req,res,next) => {
    const{id} = req.params
    const {name, image, date, } = req.body

    try {
        const training = await Training.findById(id);
        if (!training) {
          next(new ErrorResponse(`Training not found by id: ${id}`, 404));
        } else {
          const updatedTraining = await Training.findByIdAndUpdate(id, {name, image, date, } , { new: true });
          res.status(202).json({ data: updatedTraining })
        }
    } catch (error) {
        console.error(error)
        next(error)
        
    }
})

router.delete('/:id', async(req,res,next) => {
    const {id} = req.params
    
    try {
        const training = await Training.findById(id);
        if (!training) {
          next(new ErrorResponse(`Training not found by id: ${id}`, 404));
        } else {
          const deleltedTraining = await Training.findByIdAndDelete(id);
          res.status(202).json({ data: deletedTraining })
        }
    } catch (error) {
        console.error(error)
        next(error)
        
    }
})

module.exports = router;