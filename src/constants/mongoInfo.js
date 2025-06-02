import {env} from "../utils/env.js";

export const mongoInfo = () => {

    const user = env("MONGODB_USER");
    const password = env("MONGODB_PASSWORD");
    const url = env("MONGODB_URL");
    const db = env("MONGODB_DB");

    return {user, password, url, db};

}