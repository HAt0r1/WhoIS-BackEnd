import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'Not authorized' });
        const token = authHeader.split(' ')[1];
        req.user = jwt.verify(token, env('JWT_SECRET'));
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticate;