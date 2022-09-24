const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/error');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('../middlewares/jwt');
const saltRounds = 10;
const fileUploader = require('../config/cloudinary.config');

// @desc    SIGN UP new user
// @route   POST /api/v1/auth/signup
// @access  Public
router.post('/signup', async (req, res, next) => {
  const { email, password, username, imageUrl } = req.body;
  // Check if email or password or name are provided as empty string 
  if (email === "" || password === "" || username === "") {
    return next(new ErrorResponse('Please fill all the fields to register', 400))
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorResponse('Email is not a valid format', 400))
  }
   // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return next(new ErrorResponse('Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter', 400))
  }
  try {
    const userInDB = await User.findOne({ email });
    if (userInDB) {
      return next(new ErrorResponse(`User already exists with email ${email}`, 400))
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await User.create({ email, hashedPassword, username, imageUrl });
      const publicUser = { // Decide what fields of our user we want to return 
        username: user.username,
        email: user.email,
      }
      res.status(201).json({ data: publicUser });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    LOG IN user
// @route   POST /api/v1/auth/login
// @access  Public
router.post('/login', async (req, res, next) => { 
  const { email, password } = req.body;
  // Check if email or password are provided as empty string 
  if (email === "" || password === "") {
    return next(new ErrorResponse('Please fill all the fields to login', 400))
  }
  try {
    // First let's see if the user exists
    const userInDB = await User.findOne({ email });
    // If they don't exist, return an error
    if (!userInDB) {
      return next(new ErrorResponse(`No user registered by email ${email}`, 404));
    } else {
      const passwordMatches = bcrypt.compareSync(password, userInDB.hashedPassword);
      if (passwordMatches) {
        // Let's create what we want to store 
        const payload = {
          role: userInDB.role,
          email: userInDB.email,
          username: userInDB.username,
          _id: userInDB._id
        }
        // Use the jwt middleware to create de token
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "30d" }
        );
        res.status(200).json({ authToken: authToken })
      } else {
        // If the password is not right, return an error
        next(new ErrorResponse('Unable to authenticate user', 401));
      }
    }
  } catch (error) {
    next(error)
  }
});

// @desc    GET logged in user
// @route   GET /api/v1/auth/me
// @access  Private
router.get('/me', isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log('Whose token is on the request:', req.payload);
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
})

//@route   POST /api/v1/auth/edit
router.put('/edit', isAuthenticated, async (req,res,next) => {
  const user = req.payload;
  const { email, username } = req.body;

  try {
    const userInDB = await User.findById(req.payload._id);
    if(!userInDB){
      next(new ErrorResponse(`User not found by id: ${req.payload._id}`, 404));
      return;
    } else{
      const updatedUser = await User.findByIdAndUpdate(req.payload._id, { email, username }, { new: true });
      res.status(202).json({ data: updatedUser })
    }
  } catch (error) {
    console.error(error);
    next(error)
  }
})

router.delete('/delete', isAuthenticated, async (req,res,next) => {
  try {
    const userInDB = await User.findById(req.payload._id);
    if(!userInDB){
      next(new ErrorResponse(`User not found by id: ${req.payload._id}`, 404));
      return;
    } else{
      const deletedUser = await User.findByIdAndDelete(req.payload._id)
      res.status(202).json({ data: deletedUser })
    }
  } 
  catch (error) {
    console.error(error);
    next(error)
  }
})

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  console.log(req.file)
 if (!req.file) {
   next(new ErrorResponse('Error uploading the image', 500));
   return;
 }
 res.json({ fileUrl: req.file.path });
});




module.exports = router;