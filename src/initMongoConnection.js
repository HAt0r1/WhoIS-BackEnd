import mongoose from 'mongoose';

import {mongoInfo} from "./constants/mongoInfo.js";

const initMongoConnection = async () => {
    try {
        const {user, password, url, db} = mongoInfo();
        await mongoose.connect(
            `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=WhoIs`
        );
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.log(`Error to connect MongoDB database. Error: ${error.message}`);
    }
}

export default initMongoConnection;