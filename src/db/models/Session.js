import {Schema, model} from "mongoose";

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    refreshTokenExpires: {
        type: Date,
        required: true
    }
}, {timestamps: true, versionKey: false});

export default model("Session", sessionSchema);