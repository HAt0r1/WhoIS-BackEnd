import createHttpError from "http-errors";
import User from "../db/models/User.js";
import bcrypt from "bcrypt";



export const registration = async(payload) => {
    const isValidNumber = await User.findOne({phone: payload.phone});
    if (isValidNumber) {
        throw createHttpError(409, 'This number in use');
    }

    const hashPass = await bcrypt.hash(payload.password, 10);

    return User.create({
       ...payload,
        password: hashPass,
    });
};
