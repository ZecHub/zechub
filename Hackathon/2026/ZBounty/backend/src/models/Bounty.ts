import mongoose, { Schema, Document } from 'mongoose';

export interface IBounty extends Document {
  creatorId: mongoose.Types.ObjectId;
  contributorId?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  reward: number; // in ZEC
  status: 'Draft' | 'Open' | 'In Progress' | 'In Review' | 'Completed' | 'Cancelled';
  deadline: Date;
  category: string;
  tags: string[];
  skillsRequired: string[];
  privacyScore: number;
  privacyStatus: {
    funding: 'Transparent' | 'Mixed' | 'Shielded' | 'Pending';
    payout: 'Transparent' | 'Mixed' | 'Shielded' | 'Pending';
  };
  fundingTxHash?: string;
  payoutTxHash?: string;
  createdAt: Date;
}

const BountySchema: Schema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contributorId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  reward: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Draft', 'Open', 'In Progress', 'In Review', 'Completed', 'Cancelled'],
    default: 'Draft' 
  },
  deadline: { type: Date, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  skillsRequired: { type: [String], default: [] },
  privacyScore: { type: Number, default: 0 },
  privacyStatus: {
    funding: { type: String, enum: ['Transparent', 'Mixed', 'Shielded', 'Pending'], default: 'Pending' },
    payout: { type: String, enum: ['Transparent', 'Mixed', 'Shielded', 'Pending'], default: 'Pending' },
  },
  fundingTxHash: { type: String },
  payoutTxHash: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IBounty>('Bounty', BountySchema);
