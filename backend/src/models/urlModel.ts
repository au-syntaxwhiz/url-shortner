import mongoose, { Schema, Document } from "mongoose";

interface IUrl extends Document {
  originalUrl: string;
  shortSlug: string;
  createdAt: Date;
  user: mongoose.Schema.Types.ObjectId;
  visits: number;
}

const urlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true },
  shortSlug: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  visits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.model<IUrl>("Url", urlSchema);
export default Url;
