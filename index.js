//Import express from express

import express from "express";
import router from "./routes/myroutes.js";
import mongoose from "mongoose";
import DB_URL from "./DB.js"
//Importing the module fileUpload for files management. Please install npm i express-fileupload beforehand.
import fileUpload from "express-fileupload";

const PORT = process.env.PORT || 5000;
const app = express();



//app.use(fileUpload({}))
//Express is unable to convert json data by default. We therefore write this to enable express do so.
//Registering the middleware to handle requests and response from the endpoints
//I simply chained the middlewares one after another. First I tell express to  only parse json,
//then, using the static function to pass static files, then registering the fileUpload module as a middleware for file management,
//and then I register the middleware which handles my endpoints

////IMPORTANT!!!! the order of middlewares is very important. Had we put the fileupload middleware after the json middleware, we would have received an empty object. 
////The order of middlewares defeines the logical steps a request should pass through, in order.
app.use(express.json()).use(express.static('static')).use(fileUpload({})).use("/api", router)
//While the applicatiuon grows we might create several router files, e.g. for users, for general data and etc. The above code is equivalent to
//app.use(express.json())
//app.use("/api", "router)
//Then, had we created other seperate routers (seperate files like myroutes for defining other type of routes), we could add
//app.use("/userapi", theotherouter)

//Connecting to the databse
async function start(){
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        //Listening to the server at the specified port
        app.listen(PORT, ()=>{
            console.log(`Server started running at port No: ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()