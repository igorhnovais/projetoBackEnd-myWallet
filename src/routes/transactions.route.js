import { Router} from "express";


import { postTransactionEntry,
        postTransactionExit,
        getTransactions } from "../controllers/transactions.controller.js";

import { tokenValidation } from "../middlewares/tokenValidation.middleware.js";



const router = Router();

router.post("/new-entry", tokenValidation, postTransactionEntry);

router.post("/new-exit", tokenValidation, postTransactionExit);

router.get("/transactions", getTransactions)

export default router;