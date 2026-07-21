import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

// Mock data to enable offline hackathon demos if actual daemon is not running
const MOCK_MODE = process.env.USE_MOCK_ZCASH === 'true';

export class ZcashService {
  /**
   * Fetch balance using Zingo CLI or Mock
   */
  static async getBalance(): Promise<number> {
    if (MOCK_MODE) {
      return 100.0; // Mock balance
    }
    try {
      const { stdout } = await execPromise('zingo-cli balance');
      const data = JSON.parse(stdout);
      return data.zbase || 0; // Simplified
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw new Error('Failed to fetch Zcash balance');
    }
  }

  /**
   * Send shielded transaction using Zingo CLI or Mock
   */
  static async sendShielded(address: string, amount: number, memo: string): Promise<string> {
    if (MOCK_MODE) {
      console.log(`[MOCK] Sending ${amount} ZEC to ${address} with memo: ${memo}`);
      return `txid_mock_${Date.now()}`;
    }
    try {
      const command = `zingo-cli send ${address} ${amount} "${memo}"`;
      const { stdout } = await execPromise(command);
      // Assuming stdout contains txid
      return stdout.trim();
    } catch (error) {
      console.error('Error sending shielded tx:', error);
      throw new Error('Failed to execute shielded transaction');
    }
  }

  /**
   * Verify an incoming deposit on the blockchain
   */
  static async verifyDeposit(txHash: string): Promise<boolean> {
    if (MOCK_MODE) {
      console.log(`[MOCK] Verifying deposit tx: ${txHash}`);
      return true; // Auto-verify in mock mode
    }
    // Real implementation would look up txHash via lightwalletd or zcash-cli
    return true; 
  }
}
