const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/jwt');
const Event = require('../models/Event');
const ErrorResponse = require('../utils/error');



// @route   GET /api/v1/event
router.get('/', async(req, res, next) => {
    try {
        const event= await Event.find({});
         if (!event) {
        next(new ErrorResponse('No events found', 404));}
        res.status(200).json({ data: event })
    } 
    catch (error) {
        console.error(error)
        next(error)
    }
});


// @route   POST /api/v1/event
router.post('/', async(req,res,next) => {
    try {
        const event = await Event.create(req.body);
        if (!event) {
            return next(new ErrorResponse('An error ocurred while creating an event', 500));
        } else {
            res.status(201).json({ data: event })
         }
    } catch (error) {
        console.error(error)
        next(error)       
    }
});

// @route   GET /api/v1/event/:id

router.get('/:id', async (req,res,next) => {
    const {id} = req.params
    try {
        const event = await Event.findById(id)
        if (!event) {
            next(new ErrorResponse(`An error ocurred while finding ${id} event`, 500));
          }
          res.status(200).json({ data: event })
          
    } catch (error) {
        console.error(error)
        next(error)        
    }
});

// @route   PUT /api/v1/event/:id
router.put('/:id',isAuthenticated, async(req,res,next) => {
    const{id} = req.params
    const {name, image, date } = req.body
    try {
        const event = await Event.findById(id);
        if (!event) {
            next(new ErrorResponse(`Event not found by id: ${id}`, 404));
            return;
        } else {
          const updatedEvent = await Event.findByIdAndUpdate(id, {name, image, date} , { new: true });
          res.status(202).json({ data: updatedEvent })
        }
    } catch (error) {
        console.error(error)
        next(error)    
    }
})

// @route   DELETE /api/v1/event/:id
router.delete('/:id', async(req,res,next) => {
    const {id} = req.params
    try {
        const event = await Event.findById(id);
        if (!event) {
            next(new ErrorResponse(`Event not found by id: ${id}`, 404));
            return;
        } else {
          const deletedEvent = await Event.findByIdAndDelete(id);
          res.status(202).json({ data: deletedEvent })
        }
    } catch (error) {
        console.error(error)
        next(error)       
    }
})

// @route   PUT /api/v1/event/edit/:id
router.put("/edit", isAuthenticated, async (req,res,next) => {
    const user = req.payload
    try {
        const event = await Event.findById(req.payload._id)
        if(!event){
            next(new ErrorResponse(`User  not found by id: ${req.payload._id}`, 404));
            return;
        }else{
            const newUser = Event.usersAttending.push(req.payload._id)
            event.save()
            res.status(202).json({ data: newUser })
            return event
        }
    } catch (error) { 
        console.error(error)
        next(error)
    }
})
//@desc Add users in the event
router.get("/addUser/:eventId", isAuthenticated, async (req, res, next) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if(!event){
            next(new ErrorResponse(`Event not found by id: ${eventId}`, 404));
            return;
        }else{
            event.usersAttending.push(req.payload._id);
            event.save();
            res.status(202).json({ data: event })
        }
    } catch (error) { 
        console.error(error)
        next(error)
    }
})

// @route   DELETE /api/v1/event/deleteUser/:id
router.get("/deleteUser/:eventId", isAuthenticated, async (req, res, next) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId)
        if(!event){
            next(new ErrorResponse(`Event not found by id: ${eventId}`, 404));
            return;
        }else{
            event.usersAttending.pull(req.payload._id);
            event.save()
            res.status(202).json({ data: event })
        }
    } catch (error) { 
        console.error(error)
        next(error)
    }
})

module.exports = router;