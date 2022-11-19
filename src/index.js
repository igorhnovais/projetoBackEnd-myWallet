import express from "express";
import cors from "cors";

import usersRouters from "./routes/user.route.js";

import transactionRouters from "./routes/transactions.route.js"


const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouters);
app.use(transactionRouters);


app.listen(5000, ()=> {
    console.log("port running in 5000")
});