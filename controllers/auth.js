const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = async (req, res)=>{

    const user = await User.create({...req.body})
    const token = await user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token})

}

const login = async (req, res)=>{
    const {email, password} = req.body
    if(!(email && password)){
        throw new BadRequestError('Please provide email and password')
    }


    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')

    }

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid){
        throw new UnauthenticatedError('Invalid Credentials')

    }

    const token = await user.createJWT()
    console.log('token', token)
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports = {register, login};