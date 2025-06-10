import express from 'express';
import authRouter from "./auth.js";
import domainRouter from "./domain.js";

const router = express.Router();

router.use('/auth', authRouter);

router.use('/domain', domainRouter);

export default router;