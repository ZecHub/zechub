import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  bountyId: mongoose.Types.ObjectId;
  txHash: string;
  amount: number; // in ZEC
  type: 'Funding' | 'Payout';
  status: 'Pending' | 'Confirmed' | 'Failed';
  privacyLevel: 'Transparent' | 'Mixed' | 'Shielded';
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  bountyId: { type: Schema.Types.ObjectId, ref: 'Bounty', required: true },
  txHash: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['Funding', 'Payout'],
    required: true
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Failed'],
    default: 'Pending'
  },
  privacyLevel: {
    type: String,
    enum: ['Transparent', 'Mixed', 'Shielded'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
