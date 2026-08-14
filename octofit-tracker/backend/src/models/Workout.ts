import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in minutes
  suggestedFor?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true, min: 1 },
        reps: { type: Number, required: true, min: 1 },
        weight: { type: Number, default: null },
      },
    ],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    estimatedDuration: {
      type: Number,
      required: true,
      min: 1,
    },
    suggestedFor: [String],
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
