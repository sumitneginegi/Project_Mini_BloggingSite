const mongoose = require("mongoose")



const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type :String,
        required :true
    },
    body:{
        type:String,
        required:true
    },
    authorId:{
        type:ObjectId,
        ref : "AuthorModel",
    },
    tags:[{type:String}],
    category:{
        type:String,
        required: true,
        examples:[{type:String}]
    },
    subcategory:
        [{type:String}],

        published:{type:Boolean,
            default:false
    
        },
        publishedAt: Date,


        Deleted:{
            type:Boolean,
            default:false
       
        },
        deletedAt: 
            Date,
          
        


    },{timestamps: true},
)

    module.exports= mongoose.model("blog",blogSchema)




    


