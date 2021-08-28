//Importing the Post data model from the posts.js data model module
import Post from "../models/posts.js"

//Creating a Controller class and defining its various methods. We are exporting the controller methods to the routes wher I have defined the ednpoints
// in  order to apply the below functions at specific requests
class Postscontroller {
    //A controller method for posting posts
    async create(request, response) {
        try {
            //Within the body of the request we shall be passing the data which should have the model described in the posts.js data model file
            //We therefore define a var object with the said model and say that it equals the request body
            //Because the picture is not required, as defined within our model, it's okay if the request body doesn't have it
            const { author, title, content, picture } = request.body
            //Through await we are telling that the operation is async and should return a promise when it is resolved
            const post = await Post.create({ author, title, content, picture })
            //After the post, we console.log the body of the request
            console.log(request.body)
            // response.status(200).json("JSON post")
            //We may skip the status 200, as if we call the json it already means that the function has been successfully completed
            response.json(post)
        } catch (error) {
            //In case if have an an error occurs, e.g. if the required data is not passed through the body of our request, we return the error
            response.status(500).json(error)
        }
    }

    //A controller method for getting all the posts
    async getAll(request, response) {
        try {
            const posts = await Post.find()
            return response.json(posts)
        } catch (error) {
            response.status(500).json(error)
        }
    }
    //A controller method for getting a post with a specified id
    async getByid(request, response) {
        try {
            //The {} around is a destructuring assignment syntax that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
            //Since request.params returns an object of params, we are destructuring it
            const { id } = request.params
            //If the id is not found
            if (!id) {
                return response.status(400).json({ message: "Bad request. Unable to get the id. ID is not specified" })
            }
            const post = await Post.findById(id)
            return response.json(post)
        } catch (error) {
            response.status(500).json(error)
        }
    }
    //A controller method for putting (updating) a post with a specified id
    async update(request, response) {
        try {
            //Within the body of the request we shall be passing the updated data within the body o the request
            const post = request.body
            //If the id is not specified
            if (!post._id) {
                return response.status(400).json({ message: "Bad request. Unable to update by the ID. ID is not specified." })
            }
            //We are specifying the id of the to be updated post, the updated post to be returned and pass the param new true to get the updated version version of the returning post
            const updatedpost = await Post.findByIdAndUpdate(post._id, post, {new:true})
            return response.json(updatedpost)
        } catch (error) {
            response.status(500).json(error)
        }
    }
    //A controller method for dleting by a specified id
    async delete(request, response) {
        try {
            //Since request.params returns an object of params, we are destructuring it
            //Please note we are deleting the post through passing uri query param
            //There is a n interesting discussion on whether or not we should be deleting a resource through a param,
            //or through passing the the id of the to b edeleted resource throu gh a request body here: https://stackoverflow.com/questions/14323716/restful-alternatives-to-delete-request-body
            // The common practice is that we should pass the id as a uri param to delet a resource as the body data might be wiped out for deleted resources.
            const { id } = request.params
            //If the id is not found
            if (!id) {
                return response.status(400).json({ message: "Bad request. Unable to update by the ID. ID is not specified." })
            }
            //We are specifying the id of the to be deleted post
            const deletedpost = await Post.findByIdAndDelete(id)
            return response.json(deletedpost)
        } catch (error) {
            response.status(500).json(error)
        }
    }
}

export default new Postscontroller()