import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: 'running' | 'cycling' | 'swimming' | 'walking' | 'workout';
  duration: number; // in minutes
  distance?: number; // in kilometers
  calories: number;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'walking', 'workout'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    distance: {
      type: Number,
      default: null,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
