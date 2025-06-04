import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from "./routers/index.js";

import {env} from "./utils/env.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import {notFoundHandler} from "./middlewares/notFoundHandler.js";

const PORT = env('PORT');

const setupServer = () => {
    const app = express();

    app.use(
        express.json({
            type: ['application/json', 'application/vnd.api+json'],
        }),
    );

    app.use(cors());


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