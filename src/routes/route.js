const express = require('express');
const router = express.Router();

// const authorController= require("../controllers/authorController")
// const bookController= require("../controllers/bookController")
const blogController= require("../controllers/blogController")
const authorController= require("../controllers/authorController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/createblog",blogController.createBlog)
router.post("/createAuthor",authorController.createAuthor)







// router.post("/createAuthor", authorController.createAuthor  )

// router.get("/getAuthorsData", authorController.getAuthorsData)

// router.post("/createBlog", bookController.createBlog  )

// router.get("/getBooksData", bookController.getBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;