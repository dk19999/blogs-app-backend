const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require('../errors');
const BlogModel = require("../models/blog");

const getAllBlogs = async (req, res) => {

  const { userId, sort} = req.query;
  const queryObject = {};
  if (userId) {
    queryObject.createdBy = userId;
  }

  const limit = Number(req.query.limit) || 5
  const page = Number(req.query.page) || 1
  const skip = (page-1)*limit
  const options = ['createdAt','-createdAt']
  let result =  BlogModel.find(queryObject).skip(skip).limit(limit);

  if(sort){
    let sortList = sort.split(',')
    sortList = sortList.filter(item => options.includes(item))
    result.sort(sortList.join(' '))
  }
  
  let blogs = await result

  // if()
  // let blogs = blogs.skip()
  // blogs = await b
  // blogs.every((blog)=>console.log(blog._id.getTimestamp()))
  res.status(StatusCodes.OK).json({ blogs });
};

const getUserBlogs = async (req, res) => {
  const blogs = await BlogModel.find({ _id: req.userId });
  res.status(StatusCodes.OK).json({ blogs });
};

const deleteBlog = async (req, res) => {
  const {user:{userId}, params:{id:blogId}} = req
  const blog = await BlogModel.findOneAndDelete({_id:blogId, createdBy:userId })
  if(!blog){
    throw new NotFoundError(`no blog with id ${userId}`)
  }
  res.status(200).send()
}

const updateBlog = async (req, res) => {
  const {user:{userId}, params:{id:blogId}, body:{title, content, blogCover}} = req
  if(!(title && content && blogCover)){
    throw new BadRequestError('please provide title, content and blog cover')

  }

  const blog = await BlogModel.findOneAndUpdate({_id:blogId, createdBy:userId}, req.body, {new:true, runValidators:true})
  if(!blog)
    throw new NotFoundError(`job with id ${blogId} does not exist`)
  res.status(StatusCodes.OK).json({blog})


}

const createBlog = async (req, res) => {
  const { title, body: content, image: blogCover } = req.body;
  const blog = await BlogModel.create({
    title,
    content,
    blogCover,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ blog });
};

module.exports = { getAllBlogs, createBlog, deleteBlog, updateBlog};