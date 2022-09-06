const blog = require("../models/blogModel")
//const authorModel = require("../models/authorModel")
const blogModel=require("../models/blogModel")

//====================createBlog=================

const createBlog = async function (req, res) {
  try {
    let Blog = req.body;
    let published = req.body.published;

    if (!Blog.authorId) {
      res.status(400).send({ msg: "AuthorId is not present" });
    }
    let authorId = await authorModel.findById({ _id: Blog.authorId });
    if (!authorId) {
      res.status(400).send({ msg: "AuthorId is Invalid" });
    }

    // if(published== true){
    //    console.log({publishedAt:Date()})
    //  }else res.send({msg:"Blog not published"})

    //  if(Blog.Deleted== true){
    //     console.log({deletedAt:Date()})
    //   }else res.send({msg:"Blog is not Deleted"})

    let BlogCreated = await blog.create(Blog);
    res.status(201).send({ data: BlogCreated });
    if (!Blog) {
      res.status(404).send({ msg: "This is Invalid Request", status: false });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: err.message });
  }
};
//=====================UpdateBlog========================================

const updatedBlog = async function (req, res) {
    try{
  let updateId = req.params.blogId;
  let blogId = await blog.findById({ _id:updateId});
    if (!blogId) {
      res.status(404).send({ status:false,msg: "blogId is Invalid" });
    }
    //else res.status(200).send({status:true,data:blogId})


  let updateBlog = await blog.findOneAndUpdate(
    { _id: updateId }, //condition
    { $set: { title: "FunActivities"} }, //update
    { new: true }) //return updated value
    res.status(200).send({data:updateBlog})
 
  

  if (published == true) {
    console.log({ publishedAt: Date() });
  } else res.status(400).send({ msg: "Blog not published" });


}

catch(err){
    console.log(err.message)
    res.status(500).send({msg:err.message})
}

}
//===================deleteBlog=============

const deleteBlog = async function(req, res) {    
  let blogId = req.params.blogId
  let blog = await blogModel.findById({_id:blogId})
  if(!blog) { 

      return res.status(404).send({status: false, message: "this type blog is not exists"})
  }
  
  
  let updatedBlog = await blogModel.findOneAndUpdate({_id:blogId}, {Deleted: true}, {new: true})

//     if(blog.Deleted== true){
//         console.log({deletedAt:Date()})      
 res.status(200).send({status:true,data:{updatedBlog},deletedAt:Date()})    
// res.status(200)send({msg:"Blog is not Deleted"})
 // res.status(200).send({status: true, data: updatedBlog})


}

module.exports.createBlog = createBlog;
module.exports.updatedBlog = updatedBlog;
module.exports.deleteBlog=deleteBlog