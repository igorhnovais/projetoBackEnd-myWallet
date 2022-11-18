import {entryExitSchema} from "../index.js";
import dayjs from "dayjs";


import { transactionsCollection,
        sessionsCollection, 
        usersColletion
    } from "../database/db.js";


export async function postTransactionEntry(req, res){

    const {value, description} = req.body;
    const infoUser = req.body;
    const day = dayjs().format("DD/MM");

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    const {error} = entryExitSchema.validate(infoUser, {abortEarly: false});

    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try{
        const sessions = await sessionsCollection.findOne({token});

        if(!sessions){
            return res.sendStatus(401);
        }

        const user = await usersColletion.findOne({ _id: sessions.userId});

        const entry = {
            userId: user._id, 
            type: "entry",
            value,
            description,
            day
        }


        await transactionsCollection.insertOne(entry);

        res.sendStatus(201);

    } catch (err){
        console.log(err);
        res.status(500).send('Server not running');
    }
}


export async function postTransactionExit(req, res){

    const {value, description} = req.body;
    const infoUser = req.body;
    const day = dayjs().format("DD/MM");

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    const {error} = entryExitSchema.validate(infoUser, {abortEarly: false});

    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try{
        const sessions = await sessionsCollection.findOne({token});

        if(!sessions){
            return res.sendStatus(401);
        }

        const user = await usersColletion.findOne({ _id: sessions.userId});

        const exit = {
            userId: user._id, 
            type: "exit",
            value,
            description,
            day
        }

        await transactionsCollection.insertOne(exit);

        res.sendStatus(201);

    } catch (err){
        console.log(err);
        res.status(500).send('Server not running');
    }
}


export async function getTransactions(req, res){
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token){
        return res.sendStatus(401);
    }

    try{
        const sessions = await sessionsCollection.findOne({token});

        let user = await usersColletion.findOne({_id: sessions.userId});
        user = user.name;
        
        const transactions = await transactionsCollection.find({userId: sessions.userId}).toArray();
        
        res.send({transactions, user});

    } catch (err){
        console.log(err);
        res.status(500).send('Server not running');
    }
}
