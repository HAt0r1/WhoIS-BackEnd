import {registration, login, logout, refresh} from "../services/auth.js";
import {setupSession} from "../utils/sessionSetup.js";
import {filterResUser} from "../utils/filterResUser.js";

export const registrationUserController = async (req, res, next) => {

        const { user, accessToken, refreshToken, sessionId } = await registration(req.body);

        const userWithoutTimestamps = filterResUser(user);

        setupSession(res, sessionId, refreshToken);

        res.status(200).json({
            status: 200,
            message: 'Successfully registered a user!',
            data: {
                user: userWithoutTimestamps,
                accessToken,
            },
        });

};

export const loginUserController = async (req, res) => {

        const { user, session, accessToken } = await login(req.body);

        const userWithoutTimestamps = filterResUser(user);

        setupSession(res, session._id, session.refreshToken);

        res.json({
            status: 200,
            message: 'Successfully logged in a user!',
            data: {
                user: userWithoutTimestamps,
                accessToken,
            },
        });
}

export const logoutUserController = async (req, res) => {

    if (req.cookies.sessionId) {

        await logout(req.cookies.sessionId);
    }


    res.clearCookie('sessionId', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });


    res.status(204).send();
}

export const refreshTokenController = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is missing' });
    }

    const newAccessToken = await refresh(refreshToken);
        res.json({
            status: 200,
            message: 'New access token generated',
            data: {
                accessToken: newAccessToken,
            },
        });
}

