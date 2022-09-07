const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");




router.get("/test-me", function (req, res) {
    res.send("My first ever api!");
});


router.post("/authors", authorController.createAuthor);
router.post("/blogs", blogController.createBlog);
router.put("/blogs/:blogId",blogController.updatedBlog)
<<<<<<< HEAD

router.delete("/blog",blogController.deleteBlog2)
router.delete("/blog/:blogId",blogController.deleteBlog)

<<<<<<< HEAD
router.get("/getblog",blogController.getblog)
<<<<<<< HEAD



=======
>>>>>>> c0d412fe318c0e83e75db2b55943ba51e7c72b36
=======
>>>>>>> 5e13d465c1a44b26a5c8de157b9abde946366159
=======
router.delete("/blogs/:blogId",blogController.deleteBlog)
router.get("/blogs",blogController.getblog)
router.post("/login",blogController.authorLogin)
>>>>>>> fd78e2bafdeecac065fb07e09cdbb7772b294cdd

module.exports = router;
