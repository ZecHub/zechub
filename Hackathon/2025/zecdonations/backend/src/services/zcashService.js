// src/services/zcashService.js
import axios from "axios";

class ZcashService {
  constructor() {
    this.zingoBaseUrl =
      process.env.ZINGO_API_URL || "https://zingo.teslasdev.com";
    this.isConnected = false;
    this.wallets = new Map(); // Store wallet_id -> wallet_data
  }

  async checkConnection() {
    console.log("Trying to reconnect");
    try {
      console.log(process.env.DISCORD_CLIENT_ID);
      const response = await axios.get(`${this.zingoBaseUrl}/health`);
      this.isConnected = response.status === 200;
      return this.isConnected;
    } catch (error) {
      console.error("❌ Cannot connect to Zingo API:", error.message);
      this.isConnected = false;
      return false;
    }
  }

  async initializeWallet() {
    try {
      let response = await axios.post(
        `${this.zingoBaseUrl}/api/wallet/create`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const walletData = response.data;
      console.log(walletData);

      this.wallets.set(walletData.wallet_id, walletData);
      return walletData;
    } catch (error) {
      console.error("Wallet initialization failed:", error.message);
      throw new Error(
        `Zingo API error: ${error.response?.data?.error || error.message}`
      );
    }
  }

  async getBalance(walletId = null) {
    try {
      const targetWalletId = walletId || Array.from(this.wallets.keys())[0];

      if (!targetWalletId) {
        throw new Error("No wallets available");
      }

      const response = await axios.get(
        `${this.zingoBaseUrl}/api/wallet/${targetWalletId}/balance`
      );
      return response.data;
    } catch (error) {
      console.error("Balance check failed:", error.message);
      throw new Error(
        `Zingo API error: ${error.response?.data?.error || error.message}`
      );
    }
  }

  async checkForIncomingTransactions(walletId = null) {
    try {
      const targetWalletId = walletId || Array.from(this.wallets.keys())[0];

      if (!targetWalletId) {
        throw new Error("No wallets available");
      }

      const response = await axios.get(
        `${this.zingoBaseUrl}/api/wallet/${targetWalletId}/transactions`
      );
      return response.data;
    } catch (error) {
      console.error("Balance check failed:", error.message);
      throw new Error(
        `Zingo API error: ${error.response?.data?.error || error.message}`
      );
    }
  }

  async sendWithdrawal(sendReq) {
    try {
      const response = await axios.post(
        `${this.zingoBaseUrl}/api/wallet/send`,
        sendReq
      );
      return response.data;
    } catch (error) {
      console.error("Withdrawal failed:", error.message);
      throw new Error(
        `Zingo API error: ${error.response?.data?.error || error.message}`
      );
    }
  }
}

export default new ZcashService();
