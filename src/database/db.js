import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try{
    await mongoClient.connect();
    console.log("MongoDB Conectado");
} catch (err) {
    console.log(err);
}

const db = mongoClient.db("myWallet");
export const users = db.collection("users");
export const sessions = db.collection("sessions");