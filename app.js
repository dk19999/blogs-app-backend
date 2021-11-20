require('dotenv').config()
require('express-async-errors')

const express = require('express')
const fileUpload = require('express-fileupload')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const blogsRouter = require('./routes/blogsRoute')
const authRouter = require('./routes/authRoute')
const authMiddleware = require('./middleware/auth')
const cloudinary = require('cloudinary').v2
const cors = require('cors')

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

const app = express()

const port = process.env.PORT || 5000

app.get('/',(req, res)=>{
    res.send('Blogs API')
})
app.use(express.json());
app.use(fileUpload({useTempFiles:true}))
app.use(cors())

app.use('/api/v1/blogs',authMiddleware, blogsRouter)
app.use('/api/v1/auth', authRouter)


app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`listening on port ${port}`)
        })
    }
    catch(err){
        console.log(err)
    }
    
}

start();