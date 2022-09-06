
const blog = require("../models/blogsModel")
const authorModel = require("../models/authorModel")


/*const createBlog = async function (req, res) {
  try {
    let Blog = req.body;
    let published = req.body.published;*/

const createBlog= async function (req, res) {
    try{
    let Blog = req.body
    let authorId= await authorModel.findById({_id:Blog.authorId})
    if(!authorId){
        res.status(400).send({msg:"AuthorId is Invalid"})
    }
    /*if(publisher==="true"){
      console.log({publishedAt:Date()}) 
      
    }else{
        res.send({msg:"not published"})
    }
    if(Deleted==="true"){
        console.log({DeletedAt:Date()})
    }else{
        res.send({msg:"Not deleted"})
    }*/


    /*let published= req.body.published
   

    if(!Blog.authorId){
        res.status(400).send({msg:"AuthorId is not present"})
    }
    let authorId = await authorModel.findById({_id:Blog.authorId})
    if(!authorId){
        res.status(400).send({msg:"AuthorId is Invalid"})
    }*/
    
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
const deleteBlog = async function(req, res) {    
    let blogId = req.params.blogId
    let blog = await blogsModel.findById(blogId)
    if(!blog) {
        return res.status(404).send({status: false, message: "this type blog is not exists"})
    }
    let updatedBlog = await blogModel.findOneAndUpdate({_id: blogId}, {isDeleted: true}, {new: true})
    res.status(200).send({status: true, data: updatedBlog})
  }

/*const Blogs= async function (req, res) {
    try{
    let Blog = req.body
    let authorId= await authorModel.findById({_id:Blog.authorId})
    
        res.status(400).send({msg:"AuthorId is Invalid"})
    }*/
    


module.exports.createBlog= createBlog
module.exports.updatedBlog= updatedBlog
module.exports.deleteBlog= deleteBlog
