import jwt from 'jsonwebtoken';

import {env} from "../utils/env.js";

const authenticate = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('No token');
        req.user = jwt.verify(token, env('JWT_SECRET'));;
        next();
    } catch {
        res.status(401).json({ message: 'Not authorized' });
    }
}

export default authenticate;