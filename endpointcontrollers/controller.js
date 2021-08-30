//Importing the Post data model from the posts.js data model module
import Post from "../models/posts.js"
import Postservice from "../services/postervice.js"

//Creating a Controller class and defining its various methods. We are exporting the controller methods to the routes wher I have defined the ednpoints
// in  order to apply the below functions at specific requests
class Postscontroller {
    //A controller method for posting posts
    async create(request, response) {
        
        try {
            //We are calling the Postervices' createPost function and pass the request body
            //The createPost function would then return the created post
            const post = await Postservice.createPost(request.body, request.files)
            //After the post, we console.log the body of the request
            //console.log(request.body)
            // response.status(200).json("JSON post")
            //We may skip the status 200, as if we call the json it already means that the function has been successfully completed
            console.log(post);
            response.json(post)
        } catch (error) {
            //In case if have an an error occurs, e.g. if the required data is not passed through the body of our request, we return the error
            response.status(500).json(error)
        }
    }

    //A controller method for getting all the posts
    //Again, we are using the then catch methods to catch errors as we are dealing with a promise
    async getAll(request, response) {
        await Post.find().then(posts=>{
            if (posts.length > 0) {
                response.json(posts)
            } else {
                response.status(200).json({message:"No posts"})
            }
        }).catch(()=>{
            response.status(400).json({message:"Posts are unavailable"})
        })
    }
    //A controller method for getting a post with a specified id
    async getByid(request, response) {
        //Again, we are simply calling the Postservices' function which accepts an argument
        //As an argument, we will supply the request param id, and that function would return as the post with the specified ID
        //We also specify a method for handling errors and situations when either the user with specified ID is not found (returned post will be null), but the promise will be resolved 
        //Or when the ID format is completely wrong, in which case the promise will b erejected and we will return a response 400 with the given message
        await Postservice.getByid(request.params.id).then(post => {
            if (post) {
                response.json(post)
            } else {
                response.status(404).json({message:"A user with the specified ID does not exist"})
            }
        }).catch(()=>{
            response.status(400).json({message:"ID format is wrong"})
        })
    }
    //A controller method for putting (updating) a post with a specified id
    async update(request, response) {
    //We are passing the ID (mongodb's _id which is assigned by it) through the request body, the request body, and receive the resolved post
    //Here the then cacth method will catch our user defined defined exception for cases when the ID is not provided
        await Postservice.update(request.body).then(updatedPost => {
                //If the response is not null, i.e. a normal ID has been provided, as we are updating by ID
            if (updatedPost) {
                response.json(updatedPost)
            } else {
                //If the response,i.e the resolved data is null (this is what happens when the ID i sn ot found)
                response.status(500).json({ message: "No User found with the specified ID" })
            }
        }).catch((error) => {
            //Else, means either our first exception has been triggered within our Postservice, i.e. no ID is provided, or the one within the catch of the promise, i.e. id is of a wrong format
            //Error(error).message syntax is optional, it simply creates an error object and returns the message.
            //We could have simply written error.message to get the exception message
            response.status(500).json(Error(error).message)
        })
    }
    
    //A controller method for dleting by a specified id
    async delete(request, response) {
        //Since request.params returns an object of params, we are destructuring it
        //Please note we are deleting the post through passing uri query param
        //There is a n interesting discussion on whether or not we should be deleting a resource through a param,
        //or through passing the the id of the to be deleted resource through a request body here: https://stackoverflow.com/questions/14323716/restful-alternatives-to-delete-request-body
        // The common practice is that we should pass the id as a uri param to delet a resource as the body data might be wiped out for deleted resources.

        //We are specifying the id of the post to be deleted post, but this time, through the URI params
        await Postservice.delete(request.params.id).then(postForDeletion => {
            if (postForDeletion) {
                response.json(postForDeletion)
            } else {
                response.status(500).json({ message: "No User found with the specified ID" })
            }
        }).catch((error) => {
             //Error(error).message syntax is optional, it simply creates an error object and returns the message.
            //We could have simply written error.message to get the exception message
            response.status(500).json(Error(error).message)
        })
    }
}

export default new Postscontroller()