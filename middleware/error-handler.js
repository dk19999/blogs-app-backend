const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = (err, req, res,next)=>{
    const customError = {
        msg:err.message || 'Something went wrong please try again',
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }
    console.log(err,'errorHandler')

    res.status(customError.statusCode).json({msg:customError.msg})

}

module.exports = errorHandlerMiddleware