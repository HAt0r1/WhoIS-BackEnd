import {registration, login} from "../services/auth.js";
import {setupSession} from "../utils/sessionSetup.js";
import {filterResUser} from "../utils/filterResUser.js";

export const registrationUserController = async (req, res, next) => {

    try {
        const { user, refreshToken, sessionId, accessToken } = await registration(req.body);

        const userWithoutTimestamps = filterResUser(user);

        setupSession(res, sessionId, refreshToken);

        res.status(200).json({
            status: 200,
            message: 'Successfully registered a user!',
            data: {
                user: userWithoutTimestamps,
                accessToken,
            }
        });
    } catch (error) {
        next(error);
    }
}

export const loginUserController = async (req, res) => {

    const { user, session } = await login(req.body);
    const userWithoutTimestamps = filterResUser(user);

    setupSession(res, session._id, session.refreshToken);

    res.json({
        status: 200,
        message: 'Successfully logged in a user!',
        data: {
            user: userWithoutTimestamps,
            accessToken: session.accessToken,
        },
    });
}

