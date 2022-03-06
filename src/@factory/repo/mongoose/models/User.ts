import isEmail from 'validator/lib/isEmail';
import { v4 as uuidv4 } from 'uuid';
import { Schema, Model, Document } from 'mongoose';
import { IUserAttributes } from '../../interfaces';
import { APP_ROLES_ARR, APP_ROLES } from '../../../../constants';
import mongoose from 'mongoose';

type IUserCreationAttributes = Omit<IUserAttributes, 'id'>;

export interface IUserDocument extends IUserCreationAttributes, Document {}

type UserModel = Model<IUserDocument>;

const UserSchema = new Schema<IUserDocument, UserModel>(
    {
        firstName: { type: String, required: false, trim: true },
        lastName: { type: String, required: false, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: { validator: isEmail, message: 'Invalid email.' }
        },
        password: { type: String, required: false, private: true },
        uid: { type: String, default: uuidv4 },
        phoneCode: { type: String, required: false, trim: true, lowercase: true },
        phoneNo: { type: String, required: false, trim: true },
        profileImage: { type: String, required: false, trim: true },
        address: { type: String, required: false, trim: true },
        address2: { type: String, required: false, trim: true },
        city: { type: String, required: false, trim: true },
        state: { type: String, required: false, trim: true },
        countryCode: { type: String, required: false, trim: true },
        zipCode: { type: String, required: false, trim: true },
        profileCompletion: { type: Number, min: 0, max: 100 },
        status: { type: Number, required: false },
        emailVerified: { type: Boolean, required: false },
        authToken: { type: String, required: false, trim: true },
        verificationTokenExpires: { type: Date, required: false },
        timeZone: { type: String, required: false },
        lastLoginDate: { type: Date, required: false },
        role: { type: Number, enum: APP_ROLES_ARR, default: APP_ROLES.USER.id },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

export const User = mongoose.model<IUserDocument, UserModel>('User', UserSchema);

export default User;
