import axios from 'axios';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const searchDomain = async (req, res) => {
    try {
        const { role, countryCode: userCC } = req.user;

        const { domain } = req.body;
        if (!domain) return res.status(400).json({ message: "Domain required" });

        const apiKey = env("WHOIS_API_KEY");
        const apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`;

        const response = await axios.get(apiUrl);
        const whoisData = response.data?.WhoisRecord;
        console.log(response)
        console.log(whoisData);

        if (!whoisData) {
            console.error("WHOIS response missing WhoisRecord:", response.data);
            return res.status(404).json({ message: "No WhoisRecord found for domain" });
        }

        const domainCC = whoisData?.registrant?.countryCode;
        if (!domainCC) {
            return res.status(404).json({ message: "Domain country code not found" });
        }

        if (role !== "admin" && domainCC !== userCC) {
            return res.status(403).json({ message: "This domain is not available for your region." });
        }

        res.json({ domain, whois: whoisData });
    } catch (err) {
        console.error("searchDomain error:", err);
        res.status(500).json({ message: "Something went wrong", data: err.message });
    }
};
