import express from 'express';

import {validateBody} from "../utils/validationBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {registrationValidation, loginValidation} from "../validations/auth.js";
import {registrationUserController, loginUserController, logoutUserController, refreshTokenController} from "../controllers/auth.js";

const router = express.Router();

router.post(
    '/register',
    validateBody(registrationValidation),
    ctrlWrapper(registrationUserController),
);

router.post(
    '/login',
    validateBody(loginValidation),
    ctrlWrapper(loginUserController),
);

router.post(
    '/logout',
    ctrlWrapper(logoutUserController),
);

router.post(
    '/refresh',
    ctrlWrapper(refreshTokenController),
)

export default router;