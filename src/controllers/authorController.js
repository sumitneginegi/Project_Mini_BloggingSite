const AuthorModel=require("../models/authorModel")
<<<<<<< HEAD
const jwt = require('jsonwebtoken');


=======
const jwt=  require("jsonwebtoken")
>>>>>>> 40e2304c47ee4430057c467e1c54751a15bbba82
const createAuthor= async function (req, res) {
    try{
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({status:true,data: authorCreated})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
}

<<<<<<< HEAD



//===============================authorLogin===============================


const authorLogin = async function (req, res) {
    try {
        let userName = req.body.email;
        let password = req.body.password;

        let author = await AuthorModel.findOne({ email: userName, password: password });
        if (!author)
            return res.status(404).send({
                status: false,
                msg: "Username or the Password is invalid",
            });   

        let token = jwt.sign(
            {//--------Payload--------------------
                authorId: author._id,
                Member1: "Neha Verma",
                Member2: "Sumit Negi",
                Member3: "Saurav Kumar",
                Member4: "Rahul Kumar",
              
            },//---------------------------Secret Key -----------------------------
            "Blogging-Mini-Site(Project1)"
        );
        res.setHeader("x-api-key", token);
        res.send({ status: true, data: token });
    }
    catch (error) {

        res.status(500).send({ error: error.message })

    }

}
=======
/*const getAuthorsData= async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({data: authors})
}*/
>>>>>>> 40e2304c47ee4430057c467e1c54751a15bbba82




module.exports.createAuthor= createAuthor
<<<<<<< HEAD
module.exports.authorLogin = authorLogin
=======
//module.exports.getAuthorsData= getAuthorsData
>>>>>>> 40e2304c47ee4430057c467e1c54751a15bbba82
