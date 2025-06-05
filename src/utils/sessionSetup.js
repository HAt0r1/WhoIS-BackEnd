import {randomBytes} from 'node:crypto';
import {FORTY_MINUTES, SEVEN_DAYS} from "../constants/sessionExpires.js";

export const createSession = () => {

    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    const accessTokenExpires = new Date(Date.now() + FORTY_MINUTES);
    const refreshTokenExpires = new Date(Date.now() + SEVEN_DAYS);


    return {
        accessToken,
        refreshToken,
        accessTokenExpires,
        refreshTokenExpires,
    };
}

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


