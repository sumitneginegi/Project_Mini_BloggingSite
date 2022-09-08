const AuthorModel=require("../models/authorModel")

const createAuthor= async function (req, res) {
    try{
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({status:true,data: authorCreated})
    }catch(err){
        res.status(500).send({msg:err.message})
    }
}




//===============================authorLogin===============================


const authorLogin = async function (req, res) {
    try {
        let userName = req.body.email;
        let password = req.body.password;

        let author = await authorModel.findOne({ email: userName, password: password });
        if (!author)
            return res.status(404).send({
                status: false,
                msg: "Username or the Rassword is invalid",
            });


        let token = jwt.sign(
            {//--------Payload--------------------
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




module.exports.createAuthor= createAuthor
module.exports.authorLogin = authorLogin