import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from "./routers/index.js";
import cookieParser from "cookie-parser";

import {env} from "./utils/env.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";

const PORT = env('PORT');

const setupServer = () => {
    const app = express();

    const allowedOrigins = ['http://localhost:5173','http://localhost:5174','http://localhost:5175','http://localhost:5176', 'http://localhost:3000'];

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }));

    app.use(
        express.json({
            type: ['application/json', 'application/vnd.api+json'],
        }),
    );

    app.use(cookieParser());

    app.use(
        pino({
            transport: { target: 'pino-pretty' },
        }),
    );

    app.use(router);

    app.use(errorHandler);

    app.use(notFoundHandler);

    app.listen(Number(PORT), () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default setupServer;