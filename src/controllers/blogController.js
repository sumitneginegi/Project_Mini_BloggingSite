const blog = require("../models/blogsModel")



const createBlog= async function (req, res) {
    try{
    let Blog = req.body
    let authorId= req.body
    if(!authorId){
        res.status(400).send({msg:"AuthorId is Invalid"})
    }
    let BlogCreated = await blog.create(Blog)
    res.status(201).send({data: BlogCreated})
    if(!Blog){
        res.status(404).send({msg:"This is Invalid Request",status:false})
    }

}
catch(err){
    console.log(err.message)
    res.status(500).send({msg:err.message})

}
}

module.exports.createBlog= createBlog
