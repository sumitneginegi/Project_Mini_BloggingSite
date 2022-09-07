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

router.delete("/blogs/:blogId",blogController.deleteBlog)

router.get("/blogs",blogController.getblog)
router.get("/blogs",blogController.deleteBlog2)
router.post("/login",blogController.authorLogin)




module.exports = router;
