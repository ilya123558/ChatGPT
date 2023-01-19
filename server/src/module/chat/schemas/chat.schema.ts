import { Schema, Types } from 'mongoose';

export const ChatSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    chat: [
      {
        entity: {
          type: String,
        },
        message: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
