import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
  };
  team?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      avatar: { type: String, default: null },
      bio: { type: String, default: '' },
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
