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

router.post('/', async(req,res,next) => {
    const {name, image, date, category} = req.body
    
    
    try {
        const newtraining= {name, image, date, category}
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