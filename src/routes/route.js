const express = require("express");
const router = express.Router();


const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
<<<<<<< HEAD
const middleware=require("../middleware/middleware.js")


=======
const mid1 = require("../middleware/mid");
const {createBlog} = require("../controllers/blogController")
>>>>>>> 40e2304c47ee4430057c467e1c54751a15bbba82





router.get("/test-me", function (req, res) {
    res.send("My first ever api!");
});


router.post("/authors", authorController.createAuthor);
<<<<<<< HEAD
router.post("/blogs",middleware.authentication,blogController.createBlog);
router.put("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.updatedBlog)

router.delete("/blogs/:blogId",middleware.authentication,middleware.authorization,blogController.deleteBlog)
router.get("/blogs",middleware.authentication,blogController.getblog)
router.delete("/blogs",middleware.authentication,middleware.authorization,blogController.deleteBlog2)
router.post("/login",authorController.authorLogin)




=======
router.post("/blogs", mid1.authentication,createBlog);
router.put("/blogs/:blogId", mid1.authentication, mid1.authorization,blogController.updatedBlog)
router.delete("/blogs/:blogId",mid1.authentication, mid1.authorization,blogController.deleteBlog)
router.delete("/blogs",blogController.deleteBlog2)
router.get("/blogs",blogController.getblog)
router.post("/login",blogController.authorLogin)
>>>>>>> 40e2304c47ee4430057c467e1c54751a15bbba82

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
