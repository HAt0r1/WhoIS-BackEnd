import express from 'express';

import {validateBody} from "../utils/validationBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {registrationValidation} from "../validations/auth.js";
import {registrationUserController} from "../controllers/auth.js";

const router = express.Router();

router.post(
    '/register',
    validateBody(registrationValidation),
    ctrlWrapper(registrationUserController),
);

export default router;