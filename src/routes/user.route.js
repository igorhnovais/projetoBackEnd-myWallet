import { Router }  from "express";

import { postParticipantSignUp,
    postParticipantSignIn 
} from "../controllers/user.controller.js";

const router = Router();

router.post("/sign-up", postParticipantSignUp);

router.post("/sign-in", postParticipantSignIn);

export default router;