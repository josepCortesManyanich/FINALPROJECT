const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/jwt');
const Training = require('../models/Training');
const ErrorResponse = require('../utils/error');
const fileUploader = require('../config/cloudinary.config');


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
router.post('/',  async(req,res,next) => {
    const {name, imageUrl, date, category} = req.body
    try {
        const newtraining= {name, imageUrl, date, category}
        const training= await Training.create(newtraining)
        if (!training) {
            return next(new ErrorResponse('An error ocurred while creating training', 500));
          }
          res.status(201).json({data: training})

    } catch (error) {
        console.error(error)
        next(error)
        
    }
});

// @route   GET /api/v1/training/:id

router.get('/:id', async (req,res,next) => {
    const {id} = req.params
    try {
        const training= await Training.findById(id)
        if (!training) {
            return next(new ErrorResponse(`An error ocurred while finding ${id} training`, 500));
          }
          res.status(200).json({ data: training })
          

    } catch (error) {
        console.error(error)
        next(error)        
    }
});

router.put('/:id',isAuthenticated,async(req,res,next) => {
    const{id} = req.params
    const {name, imageUrl, date, category } = req.body
    try {
        const training = await Training.findById(id);
        if (!training) {
            next(new ErrorResponse(`Training not found by id: ${id}`, 404));
            return;
        } else {
          const updatedTraining = await Training.findByIdAndUpdate(id, {name, imageUrl, date, category} , { new: true });
          res.status(202).json({ data: updatedTraining })
        }
    } catch (error) {
        console.error(error)
        next(error)
        
    }
})

router.delete('/:id',isAuthenticated, async(req,res,next) => {
    const {id} = req.params
    try {
        const training = await Training.findById(id);
        if (!training) {
            next(new ErrorResponse(`Training not found by id: ${id}`, 404));
            return;
        } else {
          const deletedTraining = await Training.findByIdAndDelete(id);
          res.status(202).json({ data: deletedTraining })
        }
    } catch (error) {
        console.error(error)
        next(error)
        
    }
})

router.get("/addUser/:trainingId", isAuthenticated, async (req, res, next) => {
    const { trainingId } = req.params;
    try {
        const training = await Training.findById(trainingId);
        if(!training){
            next(new ErrorResponse(`Training not found by id: ${trainingId}`, 404));
            return;
        }else{
            training.usersAttending.push(req.payload._id);
            training.save();
            res.status(202).json({ data: training })
        }
    } catch (error) { 
        console.error(error)
        next(error)
    }
})

router.get("/deleteUser/:trainingId", isAuthenticated, async(req,res,next) =>{
    const user = req.payload
    try {
        const training = await Training.findById(req.payload._id)
        if(!training){
            next(new ErrorResponse(`User not found by id: ${req.payload._id}`, 404));
            return;
        }else{
            const deletedUser = Training.usersAttending.pull(req.payload._id)
            training.save()
            res.status(202).json({ data: deletedUser })
            return training
        }
    } catch (error) { 
        console.error(error)
        next(error)
    }
})
//@desc Add images from Cloudinary
//@route /api/v1/training/upload
//@acces PRIVATE
//router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
   // if (!req.file) {
   //   next(new ErrorResponse('Error uploading the image', 500));
   //   return;
   // }
  //  res.json({ fileUrl: req.file.path });
 // });


// PUT editar un training por su /delete/:trainingId, isAuthenticated,
// Buscar el training, si no encuentra da error
// training.usersAttending.push(req.payload._id)
// training.save()
// devuelvo el training normal

module.exports = router;