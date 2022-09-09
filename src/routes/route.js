const express = require("express");
const router = express.Router();


const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const mid1 = require("../middleware/mid");
const {createBlog} = require("../controllers/blogController")





router.get("/test-me", function (req, res) {
    res.send("My first ever api!");
});


router.post("/authors", authorController.createAuthor);
router.post("/blogs", mid1.authentication,createBlog);
router.put("/blogs/:blogId", mid1.authentication, mid1.authorization,blogController.updatedBlog)
router.delete("/blogs/:blogId",mid1.authentication, mid1.authorization,blogController.deleteBlog)
router.delete("/blogs",blogController.deleteBlog2)
router.get("/blogs",blogController.getblog)
router.post("/login",blogController.authorLogin)

module.exports = router;






// const express = require("express");
// const router = express.Router();

// const authorController = require("../controllers/authorController");
// const blogController = require("../controllers/blogController");
// const middleware = require("../middleware/middleware")
// //const {createBlog} = require("../controllers/blogController")



// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!");
// });


// router.post("/authors", authorController.createAuthor);
// router.post("/blogs",middleware.authenticate,middleware.authorise, blogController.createBlog);
// router.put("/blogs/:blogId",blogController.updatedBlog)
// router.delete("/blogs/:blogId",blogController.deleteBlog)
// router.delete("/blogs",blogController.deleteBlog2)
// router.get("/blogs",blogController.getblog)
// router.post("/login",blogController.authorLogin)
// router.delete("/blogs",blogController.deleteBlog2)

// module.exports = router;
