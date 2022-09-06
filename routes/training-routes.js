const router = require('express').Router();
const Training = require('../models/Training');
const training = require('../models/Training');

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