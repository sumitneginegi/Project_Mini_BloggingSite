const express = require("express");
const router = express.Router();


const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const middleware=require("../middleware/middleware.js")





router.get("/test-me", function (req, res) {
    res.send("My first ever api!");
});


router.post("/authors", authorController.createAuthor);
router.post("/blogs",middleware.authentication,middleware.authorization, blogController.createBlog);
router.put("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.updatedBlog)

router.delete("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.deleteBlog)
router.get("/blogs",middleware.authentication,middleware.authorization,blogController.getblog)
router.delete("/blogs",middleware.authentication,middleware.authorization,blogController.deleteBlog2)
router.post("/login",authorController.authorLogin)





module.exports = router;
