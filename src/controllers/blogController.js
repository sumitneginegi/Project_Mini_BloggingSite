const authorModel = require("../models/authorModel")
const blog = require("../models/blogsModel")
const time = require("log-timestamp")
const blogsModel = require("../models/blogsModel")
const { findOneAndUpdate } = require("../models/authorModel")



const createBlog= async function (req, res) {
    try{
    let Blog = req.body
   let publisher = req.body.published
   let Deleted = req.body.Deleted
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

    let BlogCreated = await blog.create(Blog)
    res.status(201).send({status:true,data: BlogCreated})
    if(!Blog){
        res.status(404).send({msg:"This is Invalid Request",status:false})
    }

}
catch(err){
    console.log(err.message)
    res.status(500).send({msg:err.message})
}
}
/*const Blogs= async function (req, res) {
    try{
    let Blog = req.body
    let authorId= await authorModel.findById({_id:Blog.authorId})
    
        res.status(400).send({msg:"AuthorId is Invalid"})
    }*/
    


module.exports.createBlog= createBlog
