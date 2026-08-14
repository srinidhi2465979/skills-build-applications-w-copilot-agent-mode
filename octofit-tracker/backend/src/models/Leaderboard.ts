import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  totalCalories: number;
  totalDistance: number;
  totalActivities: number;
  ranking: number;
  period: 'weekly' | 'monthly' | 'allTime';
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    totalDistance: {
      type: Number,
      default: 0,
    },
    totalActivities: {
      type: Number,
      default: 0,
    },
    ranking: {
      type: Number,
      default: 0,
    },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'allTime'],
      default: 'weekly',
    },
  },
  { timestamps: true }
);

leaderboardSchema.index({ period: 1, ranking: 1 });
leaderboardSchema.index({ user: 1, period: 1 }, { unique: true });

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
