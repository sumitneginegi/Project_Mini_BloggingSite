const jwt = require("jsonwebtoken");
const blogModel = require('../models/blogModel');
//const authorModel = require('../models/authorModel');
const ObjectId = require('mongoose').Types.ObjectId

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        
        if (!token)
            return res.status(400).send({ status: false, msg: "Token must be present" });

        let decodedToken = jwt.decode(token);
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "Token is invalid" })

        jwt.verify(token, "Blogging-Mini-Site(Project1)");

        next()
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const authorisation = async function (req, res, next) {
    try {
        let blog_id = req.params.blogId;
        if (!blog_id)
            return res.status(400).send({ status: false, msg: "Please enter blog Id" })

        if (!ObjectId.isValid(blog_id))
            return res.status(404).send({ status: false, msg: "Blog Id invalid" });

        let blog = await blogModel.findById(req.params.blogId)
        if (!blog)
            return res.status(400).send({ status: false, msg: "Blog with the given Id not present" })
        let authorId = blog.authorId
        if (!authorId)
            return res.status(400).send({ status: false, msg: "Author Id not present" })

        let token = req.headers["x-api-key"]
        let decodedToken = jwt.verify(token, "Blogging-Mini-Site(Project1)" )
        let authorLoggedIn = decodedToken.authorId
        if (authorId != authorLoggedIn)
            return res.status(403).send({ status: false, msg: 'Author logged is not allowed to modify the requested users data' })
        next()
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}







module.exports.authentication=authentication
module.exports.authorization=authorisation


