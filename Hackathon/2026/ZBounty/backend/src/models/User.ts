import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email?: string;
  password?: string;
  role: 'Freelancer' | 'Creator' | 'Admin';
  walletAddress?: string;
  bio?: string;
  avatar?: string;
  reputation: {
    bountiesFunded: number;
    completionRate: number;
    tasksCompleted: number;
    totalRewardsEarned: number;
    successRate: number;
  };
  privacyScore: {
    average: number;
    highest: number;
    championCount: number;
    totalShieldedEarnings: number;
  };
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  role: { type: String, enum: ['Freelancer', 'Creator', 'Admin'], default: 'Freelancer' },
  walletAddress: { type: String, unique: true, sparse: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  reputation: {
    bountiesFunded: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },
    totalRewardsEarned: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
  },
  privacyScore: {
    average: { type: Number, default: 0 },
    highest: { type: Number, default: 0 },
    championCount: { type: Number, default: 0 },
    totalShieldedEarnings: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
