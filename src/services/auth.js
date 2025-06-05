import createHttpError from "http-errors";
import User from "../db/models/User.js";
import Session from "../db/models/Session.js";
import bcrypt from "bcrypt";

import {createSession} from "../utils/sessionSetup.js";


export const registration = async(payload) => {
    const isValidNumber = await User.findOne({phone: payload.phone});
    if (isValidNumber) {
        throw createHttpError(409, 'This number in use');
    }

    const hashPass = await bcrypt.hash(payload.password, 10);

    const newUser = await User.create({
       ...payload,
       password: hashPass,
    });

    const newSession = await createSession();

    const session = await Session.create({
        userId: newUser._id,
        ...newSession,
    }).catch(error => {
        throw createHttpError(500, `Failed to create session ${error.message}`);
    });

    return {
        user: newUser,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        sessionId: session._id,
    }
};

export const login = async(payload) => {
    const user = await User.findOne({phone: payload.phone});
    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    const isEqual = await bcrypt.compare(payload.password, user.password);

    if (!isEqual) {
        throw createHttpError(401, 'Invalid password');
    }

    await Session.deleteOne({userId: user._id});

    const newSession = createSession();

    const session = await Session.create({
        userId: user._id,
        ...newSession,
    });

    return { user, session };
}

export const logout = async(sessionId) => {
    await Session.deleteOne({_id: sessionId});
}