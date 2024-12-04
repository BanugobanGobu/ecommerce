import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    mobileNumber: number;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
},
{timestamps:true}
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;