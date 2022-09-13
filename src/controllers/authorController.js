const AuthorModel=require("../models/authorModel")
const jwt=  require("jsonwebtoken")

//=========================================================================//

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
  };
  
  const isValidRequest = function (object) {
    return Object.keys(object).length > 0
  }
  
  const isValidEmail = function (value) {
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(value)
  }
  
  const regixValidator = function (value) {
    let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
    return regex.test(value)
  }
  
  //****************************************REGISTER NEW AUTHOR********************************* */
  
  const createAuthor = async function (req, res) {
    try {
      let requestBody = req.body
  
      if (!isValidRequest(requestBody)) {
        return res
          .status(400)
          .send({ status: false, message: "author data is required" });
      }
      //using desturcturing
      const { fname, lname, title, email, password } = requestBody;
  
      //requestBody should not have more than 5keys as per outhorSchema
      
      if (Object.keys(requestBody).length > 5) {

        return res.status(400).send({ status: false, message: "invalid data entry inside request body" })
      }
  
      if (!isValid(fname) || !regixValidator(fname)) {
        return res
          .status(400)
          .send({ status: false, message: "first name is required or its should contain character" })
      }
  
      if (!isValid(lname) || !regixValidator(lname)) {
        return res
          .status(400)
          .send({ status: false, message: "last name is required or its should contain character" })
      }
  
      if (!isValid(title)) {
        return res
          .status(400)
          .send({ status: false, message: "Title is required" })
      }
  
      if (!["Mr", "Mrs", "Miss"].includes(title)) {
        return res
          .status(400)
          .send({ status: false, message: "Title should contain Mr.,Mrs.,Miss" })
      }
  
      if (!isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "email is required" })
      }
  
      if (!isValidEmail(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter a valid email address" })
      }
  
      const isEmailUnique = await AuthorModel.findOne({ email: email })
  
      if (isEmailUnique) {
        return res
          .status(400)
          .send({ status: false, message: "Email already exits" });
      }
  
      if (!regixValidator(password)) {
        return res
          .status(400)
          .send({ status: false, message: "password is required in correct format" })
      }
  
      const authorData = {
        fname: fname.trim(),  
        lname: lname.trim(),
        title: title.trim(),
        email: email.trim(),
        password: password.trim(),
      };
  
      const newAuthor = await AuthorModel.create(authorData);
      res
        .status(201)
        .send({ status: true, message: "author registered successfully", data: newAuthor });
  
  
    } catch (err) {
      res.status(500).send({ err: err.message })
  
    }
  }
//===================================login author===================//

const authorLogin = async function (req, res) {
  try{
    

  let userName = req.body.email;
  let password = req.body.password;

  if (!isValidEmail(userName)) {
    return res
      .status(400)
      .send({ status: false, message: "Enter a valid email address" })
  }
  if (!regixValidator(password)) {
    return res
      .status(400)
      .send({ status: false, message: "password is required in correct format" })
  }



  let author = await AuthorModel.findOne({ email: userName, password: password });
 if (!author)
   return res.status(404).send({
      status: false,
   msg: "Username or the Password is invalid",
   });

 
 let token = jwt.sign(
   {//--------Payload--------------------
     authorId: author._id.toString()

   },//---------------------------Secret Key -----------------------------
   "Blogging-Mini-Site(Project1)"
 );
 res.setHeader("x-api-key", token);
 res.send({ status: true, data: token });
 
 }
 catch (err) {
  res.status(500).send({ err: err.message })

}
}





  



module.exports.createAuthor= createAuthor
module.exports.authorLogin= authorLogin

