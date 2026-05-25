import { MAIN_NEAR_ACOUNT, MAIN_NEAR_PRIVATE_KEY } from './config';
import { fullSwap } from './intents/6-full-swap';
import { state, nowEpoch, Job } from './state';
import { fetchTxnsFromTo } from './utils/near-blocks-api';
import { nsToEpochMinute, toYocto, yoctoFromApi } from './utils/utils';
import { NEAR } from "@near-js/tokens";

export async function processDueJobs() {
  const ts = nowEpoch();

  for (const job of state.jobs) {
    const deposit_address = job.deposit_address;

    console.log(job.status !== 'PENDING' && job.status !== 'PENDING_DEPOSIT');
    console.log(job.execute_at_epoch, ts);

    if (job.status !== 'PENDING' && job.status !== 'PENDING_DEPOSIT') continue;
    console.log("here");

    if (job.status === 'PENDING_DEPOSIT') {
      console.log("Checking for Deposit! for Job", job.job_id);
      console.log("Expected from address:", job.sender_address);

      const { txns } = await fetchTxnsFromTo(deposit_address, job.sender_address, { per_page: 25 });

      for (const tx of txns) {
        const txTimeEpochMinute = nsToEpochMinute(tx.block_timestamp);

        // only accept new txns after job was created
        if (txTimeEpochMinute < job.created_at_epoch - 1) continue;

        const action = tx.actions.find((a: any) => a.action === 'TRANSFER' && a.deposit);

        if (!action) continue;

        const depositYocto = yoctoFromApi(action.deposit);
        const expectedYocto = NEAR.toUnits(job.amount);

        if (depositYocto === expectedYocto) {
          console.log("Deposit verified for job", job.job_id);

          job.status = 'PENDING'; // now eligible for processing
          job.updated_at_epoch = ts;
          job.events.push({
            ts_epoch: ts,
            type: 'DEPOSIT_RECEIVED_FAKE', // or 'DEPOSIT_CONFIRMED' if you add that
            payload: {
              from_address: job.sender_address,
              amount: String(job.amount),
              token: job.sending_token,
            },
          });
          break;
        }
      }
      continue; // don’t drop into processing this cycle until next tick
    }

    if (job.execute_at_epoch > ts) continue;

    // === PROCESSING jobs ===
    job.status = 'PROCESSING';
    job.updated_at_epoch = ts;
    job.events.push({ ts_epoch: ts, type: 'PROCESSING_STARTED', payload: {} });

    try {
      await new Promise((r) => setTimeout(r, 50));
      const { finalStatus } = await fullSwap(MAIN_NEAR_ACOUNT, MAIN_NEAR_PRIVATE_KEY, job.destination_address, "", "", NEAR.toUnits(job.amount).toString());

      job.events.push({ ts_epoch: ts, type: 'TX_SUBMITTED', payload: finalStatus as any });
      job.status = 'COMPLETED';
      job.updated_at_epoch = nowEpoch();
      job.events.push({ ts_epoch: job.updated_at_epoch, type: 'JOB_COMPLETED', payload: {} });
    } catch (e: any) {
      job.status = 'FAILED';
      job.updated_at_epoch = nowEpoch();
      job.events.push({
        ts_epoch: job.updated_at_epoch,
        type: 'ERROR',
        payload: { message: e?.message || String(e) },
      });
    }
  }
}

export function startScheduler() {
  const now = new Date();
  const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
  setTimeout(() => {
    processDueJobs().catch(() => { });
    setInterval(() => processDueJobs().catch(() => { }), 60_000);
  }, Math.max(0, msToNextMinute));
}
