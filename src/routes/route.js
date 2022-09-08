const express = require("express");
const router = express.Router();


const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const middleware=require("../middleware/middleware.js")





router.get("/test-me", function (req, res) {
    res.send("My first ever api!");
});


router.post("/authors", authorController.createAuthor);
router.post("/blogs",middleware.authenticate, blogController.createBlog);
router.put("/blogs/:blogId",middleware.authenticate,blogController.updatedBlog)

router.delete("/blogs/:blogId",middleware.authenticate,blogController.deleteBlog)
router.get("/blogs",middleware.authenticate,blogController.getblog)
router.delete("/blogs",middleware.authenticate,blogController.deleteBlog2)
router.post("/login",authorController.authorLogin)





module.exports = router;
