import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  bountyId: mongoose.Types.ObjectId;
  contributorId: mongoose.Types.ObjectId;
  link: string; // GitHub repo, Document link, etc.
  notes: string;
  status: 'Submitted' | 'Accepted' | 'Rejected';
  createdAt: Date;
}

const SubmissionSchema: Schema = new Schema({
  bountyId: { type: Schema.Types.ObjectId, ref: 'Bounty', required: true },
  contributorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  link: { type: String, required: true },
  notes: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['Submitted', 'Accepted', 'Rejected'],
    default: 'Submitted'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ISubmission>('Submission', SubmissionSchema);
