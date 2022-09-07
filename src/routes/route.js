const express = require("express");
const router = express.Router();


const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");


router.get("/test-me", function (req, res) {
    res.send("My first ever api!");
});


router.post("/authors", authorController.createAuthor);
router.post("/createblog", blogController.createBlog);
router.put("/blogs/:blogId",blogController.updatedBlog)

router.delete("/blogs/:blogId",blogController.deleteBlog)

router.get("/getblog",blogController.getblog)
<<<<<<< HEAD



=======
>>>>>>> c0d412fe318c0e83e75db2b55943ba51e7c72b36

module.exports = router;
