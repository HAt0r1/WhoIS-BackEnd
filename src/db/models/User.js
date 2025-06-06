import { Schema, model } from 'mongoose';
import { parsePhoneNumber } from 'libphonenumber-js';
import {getIsoCountryCode} from "../../utils/getIsoCountryCode.js";

const UserSchema = new Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        countryCode: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true, versionKey: false }
);

UserSchema.pre('save', function (next) {
    if (this.isModified('phone')) {
        const phoneNumber = parsePhoneNumber(this.phone);
        if (phoneNumber) {
            const countryCodeWithPlus = `+${phoneNumber.countryCallingCode}`;
            this.countryCode = getIsoCountryCode(countryCodeWithPlus);
        }
    }
    next();
});

export default model('User', UserSchema);
