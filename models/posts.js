//We need to describe the data model of the posts
//The data model represents the framework of what the relationships are within the database.
//It provides the structure within which data is stored
//Data models are just shells wherein data is populated
//It is a guide for our data
//We usually d this within our SQL databases, by say declaring a data model with name field as string and an id with a number type
//NoSQL Databases like MongoDB also need data models where we define schemes, essentialy data models for specific needs.
import mongoose from "mongoose";

const Post = new mongoose.Schema({
    author:{type:String, required:true},
    title:{type:String, required:true},
    content:{type:String, required:true},
    picture: {type:String}
})

export default mongoose.model("Post", Post)