const express = require("express");
const router = express.Router();

<<<<<<< HEAD
 const authorController= require("../controllers/authorController")

const blogController= require("../controllers/blogController")
=======
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");



>>>>>>> 662ce072f6c9197727373dc45588759a433aa334

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});


router.post("/createAuthor", authorController.createAuthor);
router.post("/createblog", blogController.createBlog);

router.put("/blogs/:blogId",blogController.updatedBlog)








<<<<<<< HEAD
 router.post("/createAuthor",authorController.createAuthor)



router.get("/getblog",blogController.getblog)


=======

// router.get("/getAuthorsData", authorController.getAuthorsData)
// router.post("/createBlog", bookController.createBlog  )
// router.get("/getBooksData", bookController.getBooksData)
// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
>>>>>>> 662ce072f6c9197727373dc45588759a433aa334

module.exports = router;
