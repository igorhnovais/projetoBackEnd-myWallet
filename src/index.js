import express from "express";
import cors from "cors";
import {MongoClient} from "mongodb";
import joi from "joi";
import dotenv from "dotenv";

import { postParticipant } from "./controllers/user.controller";

export const userSignUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});
 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();

const db = mongoClient.db("myWallet");
export const signUp = db.collection("signUps");

app.post("/participants", postParticipant);


app.listen(5000, ()=> {
    console.log("port running in 5000")
});