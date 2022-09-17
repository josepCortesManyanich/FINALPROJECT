const router = require('express').Router();
const Product = require ('../models/Products');


router.get('/products', async(req,res,next) => {
    try {
        const products = await Product.find()
        if(!products){
            next(new ErrorResponse('No Products found', 404));}
            res.status(200).json({ data: products })
        }
    catch (error) {
        console.error(error)
        next()
        
    }
})
