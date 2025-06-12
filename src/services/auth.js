import createHttpError from "http-errors";
import User from "../db/models/User.js";
import Session from "../db/models/Session.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {isAdminPhone} from "../utils/isAdminPhone.js";

import {createSession} from "../utils/sessionSetup.js";
import {env} from "../utils/env.js";

const JWT = env('JWT_SECRET');


export const registration = async (payload) => {
    const isValidNumber = await User.findOne({ phone: payload.phone });
    if (isValidNumber) {
        throw createHttpError(409, 'This number in use');
    }

    const hashPass = await bcrypt.hash(payload.password, 10);

    const isAdmin = isAdminPhone(payload.phone);

    const newUser = await User.create({
        ...payload,
        password: hashPass,
        role: isAdmin ? 'admin' : 'user',
        countryCode: isAdmin ? null : payload.countryCode,
    });

    const newSession = createSession();

    const session = await Session.create({
        userId: newUser._id,
        ...newSession,
    }).catch((error) => {
        throw createHttpError(500, `Failed to create session ${error.message}`);
    });

    const tokenPayload = {
        userId: newUser._id,
        countryCode: newUser.countryCode,
        role: newUser.role,
    };

    const accessToken = jwt.sign(tokenPayload, JWT, {
        expiresIn: '40m',
    });

    return {
        user: newUser,
        accessToken,
        refreshToken: session.refreshToken,
        sessionId: session._id,
    };
};

export const login = async (payload) => {
    const user = await User.findOne({ phone: payload.phone });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    const isEqual = await bcrypt.compare(payload.password, user.password);
    if (!isEqual) {
        throw createHttpError(401, 'Invalid password');
    }

    if (isAdminPhone(payload.phone) && user.role !== 'admin') {
        user.role = 'admin';
        user.countryCode = null;
        await user.save();
    }

    await Session.deleteOne({ userId: user._id });

    const newSession = createSession();
    const session = await Session.create({
        userId: user._id,
        ...newSession,
    });

    const tokenPayload = {
        userId: user._id,
        countryCode: user.countryCode,
        role: user.role,
    };

    const accessToken = jwt.sign(tokenPayload, JWT, {
        expiresIn: '40m',
    });

    return { user, session, accessToken };
};

export const logout = async(sessionId) => {
    await Session.deleteOne({_id: sessionId});
}

export const refresh = async (refreshToken) => {
    const session = await Session.findOne({ refreshToken });
    if (!session) {
        throw createHttpError(401, 'Invalid refresh token');
    }

    if (new Date() > session.refreshTokenExpires) {
        throw createHttpError(401, 'Refresh token has expired');
    }

    const tokenPayload = {
        userId: session.userId,
    };

    const accessToken = jwt.sign(tokenPayload, JWT, {
        expiresIn: '40m',
    });

    return accessToken;
}