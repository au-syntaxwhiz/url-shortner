import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  passwordHash: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
