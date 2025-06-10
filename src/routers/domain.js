import express from 'express';
import authenticate from "../middlewares/authenticate.js";

import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {searchDomain} from "../controllers/domens.js";

const router = express.Router();

router.post(
    '/search',
    authenticate,
    ctrlWrapper(searchDomain)
);

export default router;