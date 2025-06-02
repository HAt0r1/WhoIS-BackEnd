import setupServer from "./server.js";
import initMongoConnection from "./initMongoConnection.js";

const boostrap = async() => {
    await initMongoConnection();
    setupServer();
}

boostrap();