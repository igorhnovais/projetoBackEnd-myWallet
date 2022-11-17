import bcrypt from "bcrypt";

import {userSignUpSchema} from "../index.js";

import { signUp } from "../index.js";

export async function postParticipant (req, res){

    const infoUser = req.body;

    const userExists = await signUp.findOne({ email: infoUser.email });

    if (userExists) {
        return res.status(409).send({ message: "Esse email já existe" });
    }

    const {error} = userSignUpSchema.validate(infoUser, {abortEarly: false});

    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    const passwordHash = bcrypt.hashSync(infoUser.password, 12);

    try{
        await signUp.insertOne({...infoUser, password: passwordHash});
        res.send(201);
    } catch (err){
        console.log(err);
        res.status(500).send('Server not running');
    }
}