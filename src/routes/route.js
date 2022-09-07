const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController")

const blogController = require("../controllers/blogController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!");
});
router.post("/authors", authorController.createAuthor);
router.post("/createblog", blogController.createBlog);
router.get("/getblog", blogController.getblog);

router.put("/blogs/:blogId", blogController.updatedBlog)



module.exports = router;
