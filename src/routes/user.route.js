import { Router }  from "express";

import { postParticipantSignUp,
    postParticipantSignIn,
    deleteParticipantSession 
} from "../controllers/user.controller.js";

const router = Router();

router.post("/sign-up", postParticipantSignUp);

router.post("/sign-in", postParticipantSignIn);

router.delete("/sessions", deleteParticipantSession);

export default router;