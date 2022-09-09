const AuthorModel=require("../models/authorModel")
const jwt=  require("jsonwebtoken")
const createAuthor= async function (req, res) {
    try{
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({status:true,data: authorCreated})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
}

/*const getAuthorsData= async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({data: authors})
}*/

module.exports.createAuthor= createAuthor
//module.exports.getAuthorsData= getAuthorsData
