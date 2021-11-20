require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide name']
    },
    email:{
        type:String,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		'Please provide valid email'],
        required:[true, 'Please provide email'],
        unique:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
        minlength:8
    }

})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


UserSchema.methods.createJWT = async function(){
    const token =  jwt.sign({userId:this._id, name:this.name}  , process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
    return token

}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}


module.exports = mongoose.model('User', UserSchema)