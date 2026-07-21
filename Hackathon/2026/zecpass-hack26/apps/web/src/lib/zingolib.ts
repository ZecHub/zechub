/**
 * @module lib/zingolib
 * HTTP client for the zingolib-service (Hono server wrapping ZingoLib).
 * Handles memo fetching, balance checks, and health monitoring with retry logic.
 */

import type { ZecMemo } from '@/types/zecpass';

interface ZingolibClientConfig {
  /** Base URL of the zingolib service */
  baseUrl: string;
  /** API key for authentication */
  apiKey: string;
}

/**
 * HTTP client for communicating with the ZingoLib REST service.
 * Includes automatic retry with exponential backoff on failures.
 */
export class ZingolibClient {
  private baseUrl: string;
  private apiKey: string;
  private maxRetries = 3;

  constructor(config: ZingolibClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.apiKey = config.apiKey;
  }

  /**
   * Fetch recent shielded memos received by the ZecPass address.
   * @param since - Only return memos received after this date
   * @returns Array of memo objects
   */
  async getRecentMemos(since?: Date): Promise<ZecMemo[]> {
    const params = new URLSearchParams();
    if (since) {
      params.set('since', since.toISOString());
    }

    const url = `${this.baseUrl}/memos${params.toString() ? `?${params}` : ''}`;
    const data = await this.fetchWithRetry<{ memos: ZecMemo[] }>(url);
    return data.memos || [];
  }

  /**
   * Get the wallet balance (shielded and transparent).
   * @returns Balance object with shielded and transparent amounts
   */
  async getBalance(): Promise<{ shielded: number; transparent: number }> {
    const url = `${this.baseUrl}/balance`;
    return this.fetchWithRetry<{ shielded: number; transparent: number }>(url);
  }

  /**
   * Check if the zingolib service is healthy and synced.
   * @returns True if the service is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/health`;
      const data = await this.fetchWithRetry<{ status: string }>(url);
      return data.status === 'ok';
    } catch {
      return false;
    }
  }

  /**
   * Fetch a URL with automatic retry and exponential backoff.
   * @param url - The URL to fetch
   * @param attempt - Current attempt number (internal)
   * @returns Parsed JSON response
   */
  private async fetchWithRetry<T>(url: string, attempt = 1): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (attempt >= this.maxRetries) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`ZingoLib request failed after ${this.maxRetries} attempts: ${message}`);
      }

      // Exponential backoff: 500ms, 1000ms, 2000ms
      const delay = Math.pow(2, attempt - 1) * 500;
      await new Promise((resolve) => setTimeout(resolve, delay));

      return this.fetchWithRetry<T>(url, attempt + 1);
    }
  }
}
