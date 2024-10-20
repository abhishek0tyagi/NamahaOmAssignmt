import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
