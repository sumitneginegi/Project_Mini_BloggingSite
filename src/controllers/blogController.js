
const blogs = require("../models/blogModel")
const authorModel = require("../models/authorModel");
const  mongoose = require('mongoose')
const jwt=  require("jsonwebtoken")
const ObjectId = require('mongoose').Types.ObjectId


//===============================createblog======================//
const createBlog = async function (req, res) {
    try {
      let blog = req.body
      if (Object.keys(blog).length == 0) {
        return res.status(400).send({ status: false, msg: "No data to create a blog" })
      }
      let author_id = blog.authorId
      if (!author_id) {
        return res.status(400).send({ status: false, msg: "Author Id should be present in the blog data" })
      }
      if (!ObjectId.isValid(author_id)) {
        return res.status(404).send({ status: false, msg: "AuthorId invalid" });
      }
      let validAuthor = await authorModel.findById(author_id)
      if (!validAuthor) {
        return res.status(404).send({ status: false, msg: "Author data not found" });
      }
      let token = req.headers["x-api-key"]
      let decodedToken = jwt.verify(token, "Blogging-Mini-Site(Project1)" );
      let authorLoggedIn = decodedToken.authorId
      if (authorLoggedIn != author_id) {
        return res.status(403).send({ status: false, msg: "Author logged in cannot create blog with another author's Id" })
      }
      let is_published = blogs.published
      if (is_published == true) {
        blog.publishedAt = new Date()
        let blogCreated = await blogs.create(blog)
        return res.status(201).send({ status: true, data: blogCreated })
      }
      let blogCreated = await blogs.create(blog)
      return res.status(201).send({ status: true, data: blogCreated })
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message })
    }
  }
  

//=====================getblog========================//

const getblog = async function (req, res) {
    try {
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true; // validation of string or not            return false;
};
const isValidRequest = function (object) {
    return Object.keys(object).length > 0         //validation of keys 
};
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)    //validation of id 
};
        const requestBody = req.body;
        const queryParams = req.query;

        //conditions to find all not deleted blogs
        const filterCondition = {
            Deleted: false,
            published: true,
            deletedAt: null
        };

        if (isValidRequest(requestBody)) {          //  validation  of req body
            return res
                .status(400)
                .send({ status: false, message: "data is required in body" });
        }

        //if queryParams are present then each key to be validated then only to be added to filterCondition object. on that note filtered blogs to be returened
        if (isValidRequest(queryParams)) {
            const { authorId, category, tags, subcategory } = queryParams;//Destructuring

            if (queryParams.hasOwnProperty("authorId")) {   //it checks authorId (key) exist or not
                if (!isValidObjectId(authorId)) {
                    return res
                        .status(400)
                        .send({ status: false, message: "Enter a valid authorId" });
                }
                const authorByAuthorId = await authorModel.findById(authorId);

                if (!authorByAuthorId) {
                    return res
                        .status(400)
                        .send({ status: false, message: "no author found" })
                }
                filterCondition["authorId"] = authorId;
            }

            if (queryParams.hasOwnProperty("category")) {
                if (!isValid(category)) {
                    return res
                        .status(400)
                        .send({ status: false, message: "Blog category should be in valid format" });
                }
                filterCondition["category"] = category.trim();
            }

            //if tags and subcategory are an array then validating each element
            if (queryParams.hasOwnProperty("tags")) {
                if (Array.isArray(tags)) {
                    for (let i = 0; i < tags.length; i++) {
                        if (!isValid(tags[i])) {
                            return res
                                .status(400)
                                .send({ status: false, message: "blog tag must be in valid format" });
                        }
                        filterCondition["tags"] = tags[i].trim();
                    }
                } else {
                    if (!isValid(tags)) {
                        return res
                            .status(400)
                            .send({ status: false, message: "Blog tags must in valid format" });
                    }
                    filterCondition["tags"] = tags.trim();
                }
            }

            if (queryParams.hasOwnProperty("subcategory")) {
                if (Array.isArray(subcategory)) {
                    for (let i = 0; i < subcategory.length; i++) {
                        if (!isValid(subcategory[i])) {
                            return res
                                .status(400)
                                .send({ status: false, message: "blog subcategory must be in valid format" });
                        }
                        filterCondition["subcategory"] = subcategory[i].trim();
                    }
                } else {
                    if (!isValid(subcategory)) {
                        return res
                            .status(400)
                            .send({ status: false, message: "Blog subcategory must in valid format" });
                    }
                    filterCondition["subcategory"] = subcategory.trim();
                }
            }

            const filetredBlogs = await blogs.find(filterCondition)

            if (filetredBlogs.length == 0) {
                return res
                    .status(404)
                    .send({ status: false, message: "no blogs found" });
            }
            res
                .status(200)
                .send({ status: true, message: "filtered blog list", blogsCounts: filetredBlogs.length, blogList: filetredBlogs })

            //if no queryParams are provided then finding all not deleted blogs
        } else {
            const allBlogs = await blog.find(filterCondition);

            if (allBlogs.length == 0) {
                return res
                    .status(404)
                    .send({ status: false, message: "no blogs found" })
            }
            res
                .status(200)
                .send({ status: true, message: "blogs list", blogsCount: allBlogs.length, blogsList: allBlogs });
        }

    } catch (error) {

        res.status(500).send({ error: error.message })

    }
}




//=====================UpdateBlog========================================//

const updatedBlog = async function (req, res) {
    try {
        const isValid = function (value) {
            if (typeof value === "undefined" || value === null) return false;
            if (typeof value === "string" && value.trim().length > 0) return true; // validation of string or not            return false;
        };
        const isValidRequest = function (object) {
            return Object.keys(object).length > 0         //validation of keys 
        };
        const isValidObjectId = function (objectId) {
            return mongoose.Types.ObjectId.isValid(objectId)    //validation of id 
        };

        const blogId = req.params["blogId"]
        const requestBody = req.body;
        const queryParams = req.query;

        if (isValidRequest(queryParams)) {
            return res
                .status(400)
                .send({ status: false, message: "invalid request" })
        }

        if (!isValidRequest(requestBody)) {
            return res
                .status(400)
                .send({ status: false, message: "blog details are required for update" })
        }

        if (!isValidObjectId(blogId)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid blogId" })
        }

        const blogByBlogID = await blogs.findOne({
            _id: blogId,
            isDeleted: false,
            deletedAt: null
        });

        if (!blogByBlogID) {
            return res
                .status(400)
                .send({ status: false, message: 'no blog found by ${blogId}' });
        }

        //using destructuring then validating selected keys by user
        const { title, body, tags, subcategory } = requestBody;

        //update object has been created with two properties. if updating key is to be replaced && type is string then will be added to $set and if it is to be added && type is an array then will be added to $addToSet

        const update = {
            $set: { published: true, publishedAt: Date.now() },
            $addToSet: {}
        };

        if (requestBody.hasOwnProperty("title")) {
            if (!isValid(title)) {
                return res
                    .status(400)
                    .send({ status: false, message: "blog title should be in valid format" });
            }
            update.$set["title"] = title.trim();
        }

        if (requestBody.hasOwnProperty("body")) {
            if (!isValid(body)) {
                return res
                    .status(400)
                    .send({ status: false, message: "blog body should be in valid format" });
            }
            update.$set["body"] = body.trim();
        }

        if (requestBody.hasOwnProperty("tags")) {
            if (Array.isArray(tags)) {
                for (let i = 0; i < tags.length; i++) {
                    if (!isValid(tags[i])) {
                        return res
                            .status(400)
                            .send({ status: false, message: "Blog tags must be in valid format" });
                    }
                }
                update.$addToSet["tags"] = { $each: tags };
            } else {
                if (!isValid(tags)) {
                    return res
                        .status(400)
                        .send({ status: false, message: "blog tags must be in valid format" })
                }
                update.$addToSet["tags"] = tags.trim();
            }
        }

        if (requestBody.hasOwnProperty("subcategory")) {
            if (Array.isArray(subcategory)) {
                for (let i = 0; i < subcategory.length; i++) {
                    if (!isValid(subcategory[i])) {
                        return res
                            .status(400)
                            .send({ status: false, message: "Blog subcategory must be in valid format" });
                    }
                }
                update.$addToSet["subcategory"] = { $each: subcategory };
            } else {
                if (!isValid(subcategory)) {
                    return res
                        .status(400)
                        .send({ status: false, message: "blog subcategory must be in valid format" })
                }
                update.$addToSet["subcategory"] = subcategory.trim();
            }
        }

        const updatedBlog = await blogs.findOneAndUpdate(
            { _id: blogId, isDeleted: false, deletedAt: null },
            update,
            { new: true }
        )

        res
            .status(200)
            .send({ status: true, message: "blog updated successfully", data: updatedBlog });

    } catch (error) {

        res.status(500).send({ error: error.message })

    }
}

//=========================deleteblog=================//

const deleteBlog = async function(req, res) {    
    let blogId = req.params.blogId
    let blog1 = await blogs.findOneAndUpdate({_id:blogId},{Deleted:true},{new:true})
    if(!blogs) { 
  
        return res.status(404).send({status: false, message: "Blog is not found"})
    }
         
   res.status(200).send({status:true,data:blog1,deletedAt:Date()})    
  
  
  
  }
//====================================delete query param================//

  const deleteBlog2 = async function(req, res) {    
        try {
            let data = req.query
            let { authorId, category, tags, subcategory, published } = data //-----Destructing---------
            let isValid = mongoose.Types.ObjectId.isValid(authorId)
            if (Object.keys(data).length === 0) {
                return res.status(400).send({ status: false, message: "Please give some parameters to check" })
            }
            if (authorId) {
                
                if (!isValid) {
                    return res.status(400).send({ status: false, message: "Not a valid Author ID" })
                }
            }
           let filter = { Deleted: false}
            if (authorId != null) { filter.authorId = authorId }
            if (category != null) { filter.category = category }
            if (tags != null) { filter.tags = { $in: [tags] } }
            if (subcategory != null) { filter.subcategory = { $in: [subcategory] } }
            if (published != null) { filter.published = published }
            let filtered = await blog.find(filter)
            if (filtered.length == 0) {
                return res.status(404).send({ status: false, message: "No such data found" })
            } else {
                let deletedData = await blog.updateMany( filter,{Deleted: true  ,deletedAt:Date() }, {new: true })
            let deletedAt=Date() 
             return res.status(200).send({ status: true, msg: "data deleted successfully", data:deletedData,deletedAt })
            }
        }
        catch (error) {
            res.status(500).send({ status: false, message: error.message })
        }
      }
  
  
//============get api ============//



/*const getblog = async function (req, res) {
    try {
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true; // validation of string or not            return false;
};
const isValidRequest = function (object) {
    return Object.keys(object).length > 0         //validation of keys 
};
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)    //validation of id 
};
        const requestBody = req.body;
        const queryParams = req.query;

        //conditions to find all not deleted blogs
        const filterCondition = {
            Deleted: false,
            Published: true,
            deletedAt: null
        };

        if (isValidRequest(requestBody)) {          //  validation  of req body
            return res.status(400).send({ status: false, message: "data is required in body" });
        }

        //if queryParams are present then each key to be validated then only to be added to filterCondition object. on that note filtered blogs to be returened
        if (isValidRequest(queryParams)) {
            const { authorId, category, tags, subcategory } = queryParams;//Destructuring

            if (queryParams.hasOwnProperty("authorId")) {   //it checks authorId (key) exist or not
                if (!isValidObjectId(authorId)) {
                    return res.status(400).send({ status: false, message: "Enter a valid authorId" });
                }
                const authorByAuthorId = await authorModel.findById(authorId);

                if (!authorByAuthorId) {
                    return res.status(400).send({ status: false, message: "no author found" })
                }
                filterCondition["authorId"] = authorId;
            }

            if (queryParams.hasOwnProperty("category")) {
                if (!isValid(category)) {
                    return res.status(400).send({ status: false, message: "Blog category should be in valid format" });
                }
                filterCondition["category"] = category.trim();
            }

            //if tags and subcategory are an array then validating each element
            if (queryParams.hasOwnProperty("tags")) {
                if (Array.isArray(tags)) {
                    for (let i = 0; i < tags.length; i++) {
                        if (!isValid(tags[i])) {
                            return res.status(400).send({ status: false, message: "blog tag must be in valid format" });
                        }
                        filterCondition["tags"] = tags[i].trim();
                    }
                } else {
                    if (!isValid(tags)) {
                        return res.status(400).send({ status: false, message: "Blog tags must in valid format" });
                    }
                    filterCondition["tags"] = tags.trim();
                }
            }

            if (queryParams.hasOwnProperty("subcategory")) {
                if (Array.isArray(subcategory)) {
                    for (let i = 0; i < subcategory.length; i++) {
                        if (!isValid(subcategory[i])) {
                            return res.status(400).send({ status: false, message: "blog subcategory must be in valid format" });
                        }
                        filterCondition["subcategory"] = subcategory[i].trim();
                    }
                } else {
                    if (!isValid(subcategory)) {
                        return res.status(400).send({ status: false, message: "Blog subcategory must in valid format" });
                    }
                    filterCondition["subcategory"] = subcategory.trim();
                }
            }

            const filetredBlogs = await blog.find(filterCondition)

            if (filetredBlogs.length == 0) {
                return res.status(404).send({ status: false, message: "no blogs found" });
            }
            res.status(200).send({ status: true, message: "filtered blog list", blogsCounts: filetredBlogs.length, blogList: filetredBlogs })

            //if no queryParams are provided then finding all not deleted blogs
        } else {
            const allBlogs = await blog.find(filterCondition);

            if (allBlogs.length == 0) {
                return res.status(404).send({ status: false, message: "no blogs found" })
            }
            res
                .status(200)
                .send({ status: true, message: "blogs list", blogsCount: allBlogs.length, blogsList: allBlogs });
        }

    } catch (error) {

        res.status(500).send({ error: error.message })

    }
}*/
//-------------token Creation & Login------------------------ 

 const authorLogin = async function (req, res) {
     let userName = req.body.email;
     let password = req.body.password;
  
     let author = await authorModel.findOne({ email: userName, password: password });
    if (!author)
      return res.status(404).send({
         status: false,
      msg: "Username or the Password is invalid",
      });
  
    
    let token = jwt.sign(
      {//--------Payload--------------------
        authorId: author._id.toString()

      },//---------------------------Secret Key -----------------------------
      "Blogging-Mini-Site(Project1)"
    );
    res.setHeader("x-api-key", token);
    res.send({ status: true, data: token });
    
    }


module.exports.createBlog= createBlog
module.exports.updatedBlog= updatedBlog
module.exports.deleteBlog= deleteBlog
module.exports.deleteBlog2= deleteBlog2
module.exports.getblog= getblog
module.exports.authorLogin= authorLogin
