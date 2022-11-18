import express from "express";
import cors from "cors";
import joi from "joi";

import usersRouters from "./routes/user.route.js"


export const userSignUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
});
 

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouters)



app.listen(5000, ()=> {
    console.log("port running in 5000")
});