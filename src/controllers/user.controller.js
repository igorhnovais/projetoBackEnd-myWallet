import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

import {userSignUpSchema} from "../index.js";

import { users,
        sessions 
} from "../index.js";

export async function postParticipantSignUp (req, res){

    const infoUser = req.body;

    try{

    const userExists = await users.findOne({ email: infoUser.email });

    if (userExists) {
        return res.status(409).send({ message: "Esse email já existe" });
    }

    const {error} = userSignUpSchema.validate(infoUser, {abortEarly: false});

    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    const passwordHash = bcrypt.hashSync(infoUser.password, 12);

    delete infoUser.confirmPassword;

    
        await users.insertOne({...infoUser, password: passwordHash});
        res.send(201);

    } catch (err){
        console.log(err);
        res.status(500).send('Server not running');
    }
}

export async function postParticipantSignIn (req, res){
    const {email, password} = req.body;

    const token = uuid();

    try{
        
    const userExist = await users.findOne({email})
    console.log(userExist);

    if(!userExist){
        return res.sendStatus(401);
    }

    const passwordOk = bcrypt.compareSync(password, userExist.password);

    if(!passwordOk){
        return res.sendStatus(401); 
    }

    const userSession = await sessions.findOne({userId: userExist._id});

    if(userSession){
        return res
        .send(userSession.token);
    } 

        await sessions.insertOne({
            userId: userExist._id,
            token
        });

        res.send({token});

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};