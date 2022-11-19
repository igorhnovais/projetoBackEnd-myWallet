import { sessionsCollection, usersColletion } from "../database/db.js";

export async function tokenValidation(req, res, next){

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try{

        const sessions = await sessionsCollection.findOne({token});

        if(!sessions){
            return res.sendStatus(401);
        }

        const user = await usersColletion.findOne({ _id: sessions.userId});

        if (!user) {
            return res.sendStatus(401);
        }

        req.user = user;

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}