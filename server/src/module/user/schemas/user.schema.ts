import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: [100],
    },
    address: {
      type: String,
      required: [true],
      maxlength: [66],
    },
    nonce: {
      type: String,
    },
  },
  { timestamps: true }
);
