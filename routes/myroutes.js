import {Router} from "express"
import Postscontroller from "../endpointcontrollers/controller.js"
const router = Router()

//We are receiving the controller functions for each endpoint from a seperate controller file called controller.js
//Posting some data to the below endpoint
router.post("/posts", Postscontroller.create)
//Declaring the first endpoint for get HTTP method. Getting all posts
router.get("/posts", Postscontroller.getAll)
//Declaring the first endpoint for get HTTP method. Getting the post by ID
router.get("/posts/:id", Postscontroller.getByid)
//Declaring an endpoint for updating by the id. Please note that we shall be getting the id by which to update from the request body
router.put("/posts", Postscontroller.update)
//Delcaring an endpoint for deleting by id. Please note that we shall be getting the id by which to delete from the request body
router.delete("/posts/:id", Postscontroller.delete)

export default router