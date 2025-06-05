import express from 'express';

import {validateBody} from "../utils/validationBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {registrationValidation, loginValidation} from "../validations/auth.js";
import {registrationUserController, loginUserController} from "../controllers/auth.js";

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

)

export default router;