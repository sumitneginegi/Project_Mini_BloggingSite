const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");



=======
const authorController = require("../controllers/authorController")

const blogController = require("../controllers/blogController")
>>>>>>> a89f543182766c54c44a702617fbad4be44762b0

router.get("/test-me", function (req, res) {
    res.send("My first ever api!");
});
<<<<<<< HEAD


=======
>>>>>>> a89f543182766c54c44a702617fbad4be44762b0
router.post("/authors", authorController.createAuthor);
router.post("/createblog", blogController.createBlog);
router.get("/getblog", blogController.getblog);

<<<<<<< HEAD
router.put("/blogs/:blogId",blogController.updatedBlog)
router.delete("/blogs/:blogId",blogController.deleteBlog)
router.delete("/blog",blogController.deleteBlog2)









// router.get("/getAuthorsData", authorController.getAuthorsData)
// router.post("/createBlog", bookController.createBlog  )
// router.get("/getBooksData", bookController.getBooksData)
// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

=======
router.put("/blogs/:blogId", blogController.updatedBlog)



>>>>>>> a89f543182766c54c44a702617fbad4be44762b0
module.exports = router;
