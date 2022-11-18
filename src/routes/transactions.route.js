import { Router} from "express";

import { postTransactionEntry,
        postTransactionExit } from "../controllers/transactions.controller.js";

const router = Router();

router.post("/new-entry", postTransactionEntry);

router.post("/new-exit", postTransactionExit);

export default router;