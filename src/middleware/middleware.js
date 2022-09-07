const jwt=require('jsonwebtoken')
const authenticate = function(req, res, next) {
      //check the token in request header
    //validate this token
    try{
        let token = req.headers["x-api-key"];

      //If no token is present in the request header return error
      if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
      console.log(token);
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
  let decodedToken = jwt.verify(token, "Blogging-Mini-Site(Project1)");
  if (!decodedToken)
    return res.status(401).send({ status: false, msg: "token is invalid" });
    req.UserLoggedIn= decodedToken.userId
    next()
}
catch (err) {
  console.log("this is the error:", err.message)
  res.status(500).send({ msg: "error", error: err.message })
}
}