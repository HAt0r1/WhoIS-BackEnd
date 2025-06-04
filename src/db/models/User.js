import { Schema, model } from 'mongoose';
import { parsePhoneNumber } from 'libphonenumber-js';

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
    },
    { timestamps: true, versionKey: false }
);

UserSchema.pre('save', function (next) {
    if (this.isModified('phone')) {
        const phoneNumber = parsePhoneNumber(this.phone);
        if (phoneNumber && phoneNumber.countryCallingCode) {
            this.countryCode = phoneNumber.countryCallingCode;
        }
    }
    next();
});

export default model('User', UserSchema);
