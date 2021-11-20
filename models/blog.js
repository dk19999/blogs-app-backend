const mongoose = require('mongoose')
const user = require('./user')

const BlogSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Blog title must be provided'],
    },
    content:{
        type:String,
        required:[true,'Blog content must be provided']

    },
    blogCover:{
        type:String,
        required:[true, 'Blog cover must be provided']
    },
    tags:{
        type:Array,
        
    },
    
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
        // required:[true, 'Blog cover must be provided']

    }

},{timestamps:true})

module.exports = mongoose.model('Blogs',BlogSchema)