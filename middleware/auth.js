const jwt = require('jsonwebtoken')
const { CustomAPIErrorClass, UnauthenticatedError } = require('../errors')

const auth = (req, res,next)=>{
    if((!req.headers.authorization) || !req.headers.authorization.startsWith('Bearer ')){
        throw new UnauthenticatedError('Unauthorized')
    }

    const token = req.headers.authorization.split(' ')[1]
    try{
        // console.log(token, 'token')
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId, name:payload.name}
        next()
    }
    catch(err){
        throw new UnauthenticatedError('Authentication invalid')

        console.log(err)
    }

        // next()
}   

module.exports = auth