import {registration} from "../services/auth.js";

export const registrationUserController = async (req, res) => {
    const user = await registration(req.body);

    res.status(200).json({
        status: 200,
        message: 'Successfully registered a user!',
        data: {
            phone: user.phone,
        }
    })
}