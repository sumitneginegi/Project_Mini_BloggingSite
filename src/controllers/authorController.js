const AuthorModel=require("../models/authorModel")
const jwt = require('jsonwebtoken');


const createAuthor= async function (req, res) {
    try{
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({status:true,data: authorCreated})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
}


module.exports.createAuthor  = createAuthor

