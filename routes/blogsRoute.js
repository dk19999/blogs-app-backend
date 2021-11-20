const express = require('express')
const { getAllBlogs, createBlog, deleteBlog, updateBlog } = require('../controllers/blogsController')
const uploadController = require('../controllers/uploadController')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.route('/').get(getAllBlogs).post(authMiddleware, createBlog)
router.route('/:id').delete(deleteBlog).patch(updateBlog)
router.route('/uploads').post( uploadController)

module.exports = router