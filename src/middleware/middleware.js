const jwt = require("jsonwebtoken");
const blog = require('../models/blogModel')




const authentication = async function (req, res, next) {

  const token = req.headers["x-api-key"];

  if (!token) {
    return res
      .status(400)
      .send({ msg: "please provide token" });
  }

  try {

    const decodedToken = jwt.verify(token, "Blogging-Mini-Site(Project1)");

    if (!decodedToken)
      return res
        .status(401)
        .send({ status: false, msg: "invalid token" });

    //adding a decodedToken as a property inside request object so that could be accessed in other handler and middleware of same api

    req.decodedToken = decodedToken;

    next();
  } catch (error) {

    res
      .status(500)
      .send({ error: error.message })

  }

};



const authorization = async function (req, res, next) {
  try {

    const blogId = req.headers["x-api-key"];
    if (!token) res.send({ msg: "token is reqd" })

    const decodedToken = jwt.verify(token, "Blogging-Mini-Site(Project1)")
    if (!decodedToken) res.send({ msg: "token is invalid" })

   let userTobeModified =req.query.authorId
    let userLoggedIn = decodedToken.authorId
  
    if (decodedToken.authorId != blogByBlogId.authorId) {  
      return res
        .status(403)
        .send({ status: false, message: "unauthorize access" });
    }

    next();

  } catch (error) {

    res
      .status(500)
      .send({ error: error.message })

  }
}





// const jwt = require("jsonwebtoken");
// const blogModel = require("../models/blogModel");
// //Checking Header-Value in (Present/Not)
// exports.headerCheck = function (req, res, next) {
//   try {
//     let headerData = req.headers["x-api-key"];
//     if (headerData === undefined) {
//       return res.send({ msg: "Header Is Madtory" });
//     } else {
//       next();
//     }
//   } catch (err) {
//     res.status(500).send({ msg: "Server Error 500" });
//   }
// };

// //Authentication Part
// exports.authentication = function (req, res, next) {
//   try {
//     let Token = req.headers["x-api-key"];
//     let tokenVerify = jwt.verify(Token, "FunctionUP-Project1-Group30");

//     if (tokenVerify.UserId !== req.query.authorId) {
//       return res.status(404).send({ msg: "User is Imposter" });
//     } else {
//       next();
//     }
//   } catch (err) {
//     res.status(500).send({ msg: "Server Error 500" });
//   }
// };

// //Only For Path And Delete

// exports.blogIdPlusAuthorIdCheck = async function (req, res, next) {
//   try {
//     let Token = req.headers["x-api-key"];
//     //
//     let tokenVerify = jwt.verify(Token, "FunctionUP-Project1-Group30");
//     if (tokenVerify.UserId !== req.query.authorId) {
//       return res.status(404).send({ msg: "User is Imposter" });
//     }
//     //First  Checking BlogID(Valid/Not)
//     if (req.params.blogId == ":blogId") {
//       return res.status(400).send({ msg: "BlogID Cant Be Empty" });
//     }
//     let checkBlogId = await blogModel.findById(req.params.blogId);
//     if (!checkBlogId) {
//       return res.status(400).send({ msg: "Blog Id is Invalid" });
//     }

//     //Second Verifying User BY theri AUTHORID
//     else {
//       if (req.query.authorId != checkBlogId.authorId) {
//         return res.status(404).send({ msg: "AuthorID is Not Matched" });
//       } else {
//         next();
//       }
//     }
//   } catch (err) {
//     return res.status(500).send({ msg: "Server Error 500" });
//   }
// };


// module.exports.authentication = authentication
// module.exports.blogIdPlusAuthorIdCheck = blogIdPlusAuthorIdCheck

