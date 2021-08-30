import Post from "../models/posts.js"
import fileservice from "./fileservice.js";

class Postservice {
    //Here, through the async function createpost, which accepts an argument, we are creating a post through the native create method and passing the post argument
    //Then we simply return the created post
    //This function is then passed on to the controller, and the controller would pass the request body as an argument
    async createPost(post, picture) {
        const fileName = fileservice.saveFile(picture);
        const createdPost = await Post.create({...post, picture:fileName});
        console.log(fileName)
        return createdPost
    }

    //A returning resolved posts
    async getAll() {
        return await Post.find()
    }
    //Again this a convenient function which accepts as an argument ID and returns the resolved post
    async getByid(id) {
        return await Post.findById(id)
    }
    //Again this a convenient function which accepts as an argument ID (mongodb's _id which is assigned by it) and returns the resolved post
    async update(post) {
        //The param new true to get the updated version version of the returning post
        //If the ID is not provided through the body, we throw an exception and stop the function
        if (!post._id) {
            throw new Error("ID is not provided")
        }
        //We return the 
        return await Post.findByIdAndUpdate(post._id, post, { new: true }).catch(() => { throw new Error("ID is of a wrong format") })
    }
    //A controller method for dleting by a specified id
    async delete(id) {
        //If the ID is not provided through uri params, we throw an exception and stop the function
        if (!id) {
            throw new Error("ID is not provided")
        }
        return await Post.findByIdAndDelete(id).catch(() => { throw new Error("ID is of a wrong format") })
    }
}

export default new Postservice()