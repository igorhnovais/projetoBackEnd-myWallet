import { Router} from "express";


import { postTransactionEntry,
        postTransactionExit,
        getTransactions } from "../controllers/transactions.controller.js";



const router = Router();

router.post("/new-entry", postTransactionEntry);

router.post("/new-exit", postTransactionExit);

router.get("/transactions", getTransactions)

export default router;