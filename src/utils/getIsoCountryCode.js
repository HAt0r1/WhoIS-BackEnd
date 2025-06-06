import {countryCodeMapping} from "../constants/countryMapping.js";

export const getIsoCountryCode = (phoneNumberWithPlus) => {
    return countryCodeMapping[phoneNumberWithPlus] || null;
};