import { Schema } from 'mongoose';

export const TokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

TokenSchema.index({ token: 1, userId: 1 }, { unique: true });
