import express from "express";
import cors from "cors";
import {MongoClient} from "mongodb";
import joi from "joi";
import dotenv from "dotenv";

import { postParticipantSignUp,
    postParticipantSignIn 
} from "./controllers/user.controller.js";

export const userSignUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
});
 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();

const db = mongoClient.db("myWallet");
export const users = db.collection("users");
export const sessions = db.collection("sessions");


app.post("/sign-up", postParticipantSignUp);

app.post("/sign-in", postParticipantSignIn);


app.listen(5000, ()=> {
    console.log("port running in 5000")
});