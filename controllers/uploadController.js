const {BadRequestError} = require('../errors')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const { StatusCodes } = require('http-status-codes')

const uploadController = async (req, res)=>{
    const maxSize = 1024*1024 // 1mb
    if(!req.files)
        throw new BadRequestError('file not found')

    const blogCoverImage = req.files.image

    if(!blogCoverImage.mimetype.startsWith('image')){
        throw new BadRequestError('please upload an image')
    }

    if(blogCoverImage.size > maxSize)
        throw new BadRequestError(`image size should not be more than ${maxSize}`)

    const result = await cloudinary.uploader.upload(blogCoverImage.tempFilePath, 
        {
            use_filename:true,
            folder:'blog_covers'
        })

    res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
    fs.unlinkSync(blogCoverImage.tempFilePath)

}

module.exports = uploadController