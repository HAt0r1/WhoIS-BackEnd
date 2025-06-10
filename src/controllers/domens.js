import * as whoiser from 'whoiser';
import jwt from 'jsonwebtoken';


import {env} from "../utils/env.js";

export const searchDomain = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    const { id: userId, role, countryCode: userCC } = jwt.verify(token, env('JWT_SECRET'));

    const { domain } = req.body;
    if (!domain) return res.status(400).json({ message: 'Domain required' });

    const whoisData = await whoiser(domain);
    const domainCC = whoisData.country || whoisData['Registrant Country'] || whoisData['Registrant Country Code'];
    if (!domainCC) return res.status(404).json({ message: 'Domain country code not found' });

    if (role !== 'admin' && domainCC !== userCC) {
        return res.status(403).json({ message: 'This domain is not available for your region.' });
    }

    res.json({ domain, whois: whoisData });
}