const router = require('express').Router();
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');
const User = require('../models/User');
const fileUploader = require('../config/cloudinary.config');

// @desc    Get all users
// @route   GET /api/v1/user/loggedInUser
// @access  Private

router.get('/loggedInUser', isAuthenticated, async (req, res, next) => {
    try {
      const user = await User.findById(req.payload._id);
      if (!user) {
        next(new ErrorResponse('No user found', 404));
        return;
      }
      res.status(200).json({ data: user })
    } catch (error) {
      next(error);
    }
  });

  router.put('/edit', isAuthenticated, async (req, res, next) => {
    const { email, username, imageUrl } = req.body;
    
    if (email === "" || username === "") {
      return next(new ErrorResponse('Please fill all the fields to register', 400))
    }
    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return next(new ErrorResponse('Email is not a valid format', 400))
    }
    try {
      const user = await User.findById(req.payload._id);
      if (!user) {
        next(new ErrorResponse('No user found', 404));
        return;
      } else {
        const changedUser = {email, username, imageUrl}
        const updatedUser = await User.findByIdAndUpdate(req.payload._id, {changedUser}, { new: true });
        res.status(200).json({ data: updatedUser })
      }
    } catch (error) {
      next(error);
    }
  });

  router.put("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    console.log(req.file)
   if (!req.file) {
     next(new ErrorResponse('Error uploading the image', 500));
     return;
   }
   res.json({ fileUrl: req.file.path });
  });
  
  
  module.exports = router;