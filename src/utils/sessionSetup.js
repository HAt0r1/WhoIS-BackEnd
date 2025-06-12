import {randomBytes} from 'node:crypto';
import {SEVEN_DAYS} from "../constants/sessionExpires.js";

export const createSession = () => {
    const refreshToken = randomBytes(30).toString('base64');
    const refreshTokenExpires = new Date(Date.now() + SEVEN_DAYS);

    return {
        refreshToken,
        refreshTokenExpires,
    };
};

export const setupSession = (res, sessionId, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + SEVEN_DAYS),
        sameSite: 'none',
        secure: true,
    });

    res.cookie('sessionId', sessionId, {
        httpOnly: true,
        expires: new Date(Date.now() + SEVEN_DAYS),
        sameSite: 'none',
        secure: true,
    });
};


