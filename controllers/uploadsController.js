const path = require('path')
const CustomError = require('../errors')
const {StatusCodes} = require('http-status-codes')
const cloudinary = require('cloudinary').v2
const fs = require('fs')


const uploadProductImageLocal = async(req,res)=>{
    if(!req.files)
    {
        throw new CustomError.BadRequestError('Please select an image')
    }
    const productImage = req.files.image
    if(!productImage.mimetype.startsWith('image'))
    {
        throw new CustomError.BadRequestError('File type is not image')
    }
    console.log(productImage.size)
    const maxSize = 10*1024 * 1024
    if(productImage.size > maxSize)
    {
        throw new CustomError.BadRequestError('Image size is greater than 10 Mb')
    }
    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
    req.files.image.mv(imagePath)
    // res.send("Upload the image ")

    res.status(StatusCodes.OK).json({ image: { src: '/uploads/'+`${productImage.name}` } })
    
}

const uploadProductImage = async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.files.image,{
        use_filename:true,
        folder:'file-upload',
    });
    console.log(result);
    fs.unlinkSync(req.files.image)
    return res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
}

module.exports = {uploadProductImage}