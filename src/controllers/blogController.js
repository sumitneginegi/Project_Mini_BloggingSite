



const blogsModel= require("../models/blogsModel")
const authorModel = require("../models/authorModel")
const { default: mongoose } = require('mongoose')


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
        /*let blogId = req.params.blogId
        let blog = await blogsModel.findById({_id:blogId})
        if(!blog) { 
      
            return res.status(404).send({status: false, message: "this type blog is not exists"})
        }
        
        let updatedBlog = await blogsModel.findOneAndUpdate({_id:blogId},{$set:{ title: "FunActivities"}} , {published: true}, {new:true})
       res.status(200).send({status:true,data:{updatedBlog},publishedAt:Date()})   */ 
      
      
      
  let updateId = req.params.blogId;
  
  let blogId = await blogsModel.findById({ _id:updateId});
    if (!blogId) {
      res.status(404).send({ status:false,msg: "blogId is Invalid" });
    }
    
    
    
    //else res.status(200).send({status:true,data:blogId})
  let updateBlog = await blogsModel.findOneAndUpdate(
    { _id: updateId }, //condition
    { $set: { title: "FunActivities"} }, //update
    { new: true }) //return updated value
    res.status(200).send({data:updateBlog})
 if(published===true){
    console.log({ publishedAt: Date() });
  } else res.status(400).send({ msg: "Blog not published" });
  

}

catch(err){
    console.log(err.message)
    res.status(500).send({msg:err.message})
}

}
/*const getblog = async function (req, res) {
    try {

        const filterQuery = {}
        const queryParams = req.query
        const isValidRequest = function(object){
            return Object.keys(object).length > 0
        };

       if (isValidRequest(queryParams)) {
            const { authorId, category, tags, subcategory } = queryParams

            if (isValid(authorId) && isValidObjectId(authorId)) {
                filterQuery['authorId'] = authorId
            }

            if (isValid(category)) {
                filterQuery['category'] = category.trim()
            }
           
            if (isValid(tags)) {
                filterQuery['tags'] = tags.trim()
            }
            
            if (isValid(subcategory)) {
                filterQuery['subcategory'] = subcategory.trim()
            }
          
        }
        

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: err.message })

    }
}*/






const deleteBlog = async function(req, res) {    
    let blogId = req.params.blogId
    let blog = await blogsModel.findById({_id:blogId})
    if(!blog) { 
  
        return res.status(404).send({status: false, message: "this type blog is not exists"})
    }
    
    let updatedBlog = await blogsModel.findOneAndUpdate({_id:blogId},{Deleted:false},{new: true})
   res.status(200).send({status:true,data:{updatedBlog},deletedAt:Date()})    
  
  
  }
  const deleteBlog2 = async function(req, res) {    
        try {
            let data = req.query
            let { authorId, category, tags, subcategory, Published } = data
            let isValid = mongoose.Types.ObjectId.isValid(authorId)
            if (Object.keys(data).length === 0) {
                return res.status(400).send({ status: false, message: "Please give some parameters to check" })
            }
            if (authorId) {
                if (!isValid) {
                    return res.status(400).send({ status: false, message: "Not a valid Author ID" })
                }
            }
          //  let filter = { Deleted: false }
            if (authorId != null) { filter.authorId = authorId }
            if (category != null) { filter.category = category }
            if (tags != null) { filter.tags = { $in: [tags] } }
            if (subcategory != null) { filter.subcategory = { $in: [subcategory] } }
            if (Published != null) { filter.isPublished = isPublished }
            let filtered = await blogsModel.find(filter)
            if (filtered.length == 0) {
                return res.status(400).send({ status: false, message: "No such data found" })
            } else {
                let deletedData = await blogsModel.updateMany( {Deleted: false  ,deletedAt:Date() }, {new: true })
            let deletedAt=Date() 
             return res.status(200).send({ status: true, msg: "data deleted successfully",message: deletedData,deletedAt :deletedAt })
            }
        }
        catch (error) {
            res.status(500).send({ status: false, message: error.message })
        }
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
module.exports.deleteBlog2= deleteBlog2
module.exports.getblog= getblog


