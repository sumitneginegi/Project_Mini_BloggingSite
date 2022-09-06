const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");




router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});


router.post("/createAuthor", authorController.createAuthor);
router.post("/createblog", blogController.createBlog);

router.put("/blogs/:blogId",blogController.updatedBlog)
router.delete("/blogs/:blogId",blogController.deleteBlog)








// router.get("/getAuthorsData", authorController.getAuthorsData)
// router.post("/createBlog", bookController.createBlog  )
// router.get("/getBooksData", bookController.getBooksData)
// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;
