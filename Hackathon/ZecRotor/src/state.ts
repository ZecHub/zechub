import { GetExecutionStatusResponse } from "@defuse-protocol/one-click-sdk-typescript";

export type JobStatus = 'PENDING_DEPOSIT' | 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export type JobEvent =
  | { ts_epoch: number; type: 'JOB_CREATED'; payload: Record<string, unknown> }
  | { ts_epoch: number; type: 'DEPOSIT_ADDRESS_ISSUED'; payload: { deposit_address: string } }
  | { ts_epoch: number; type: 'DEPOSIT_RECEIVED_FAKE'; payload: { from_address: string; amount: string; token: string } }
  | { ts_epoch: number; type: 'PROCESSING_STARTED'; payload: Record<string, unknown> }
  | { ts_epoch: number; type: 'TX_SUBMITTED'; payload: { finalStatus: GetExecutionStatusResponse.status } }
  | { ts_epoch: number; type: 'JOB_COMPLETED'; payload: Record<string, unknown> }
  | { ts_epoch: number; type: 'ERROR'; payload: { message: string } };

export interface Job {
  job_id: string;
  sender_address: string;
  sending_token: string;
  destination_address: string;
  destination_token: string;
  execute_at_epoch: number;
  deposit_address: string;
  amount: number;
  status: JobStatus;
  events: JobEvent[];
  created_at_epoch: number;
  updated_at_epoch: number;
}

export const state: { jobs: Job[] } = { jobs: [] };

export const nowEpoch = () => Math.floor(Date.now() / 1000);
