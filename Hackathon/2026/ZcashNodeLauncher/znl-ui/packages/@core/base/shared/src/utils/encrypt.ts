import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

/**
 * API Decrypt Tool Class *Supports AES and RSA encryption algorithms
 */

/**
 * AES Encryption Tool Class
 */
export const AES = {
  /**
   * AES Encryption * @param data to encrypt data * @param key encryption key * @returns encrypt string
   */
  encrypt(data: string, key: string): string {
    try {
      if (!key) {
        throw new Error('AES Encryption Key cannot be empty');
      }
      if (key.length !== 32 && key.length !== 16) {
        throw new Error(
          `AES encryption key length must be 32 bits or 16 bits, current length: ${key.legth}`,
        );
      }

      const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
      const encrypted = CryptoJS.AES.encrypt(data, keyUtf8, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    } catch (error) {
      console.error('Synchronising folder failed: %s: %s', error);
      throw error;
    }
  },

  /**
   * AES Decrypt * @param encryptData encrypted data * @param key decrypt key * @returns decrypted string
   */
  decrypt(encryptedData: string, key: string): string {
    try {
      if (!key) {
        throw new Error('AES Decrypt Key cannot be empty');
      }
      if (key.length !== 32) {
        throw new Error(
          `AES decryption key length must be 32 bits, current length: ${key.length}`,
        );
      }
      if (!encryptedData) {
        throw new Error('AES Decrypt data cannot be empty');
      }

      const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
      const decrypted = CryptoJS.AES.decrypt(encryptedData, keyUtf8, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      if (!result) {
        throw new Error(
          'AES Decrypt result empty, possibly key error or data damage',
        );
      }
      return result;
    } catch (error) {
      console.error('AES Decrypt Failed:', error);
      throw error;
    }
  },
};

/**
 * RSA Encryption Tool Class
 */
export const RSA = {
  /**
   * RSA encryption * @param data to encrypt data * @param publicKey public key (required) * @returns encrypt string
   */
  encrypt(data: string, publicKey: string): false | string {
    try {
      if (!publicKey) {
        throw new Error('RSA public key cannot be empty');
      }

      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(publicKey);
      const result = encryptor.encrypt(data);
      if (result === false) {
        throw new Error(
          'RSA encryption failed, possibly in public key format error or too long data',
        );
      }
      return result;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  },

  /**
   * RSA Decrypt * @param encryptData encrypted data * @param privatekey (required) *
   */
  decrypt(encryptedData: string, privateKey: string): false | string {
    try {
      if (!privateKey) {
        throw new Error('RSA private key cannot be empty');
      }
      if (!encryptedData) {
        throw new Error('RSA Decrypt data cannot be empty');
      }

      const encryptor = new JSEncrypt();
      encryptor.setPrivateKey(privateKey);
      const result = encryptor.decrypt(encryptedData);
      if (result === false) {
        throw new Error(
          'RSA decryption failed, may be a private key error or data damage',
        );
      }
      return result;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  },
};

/**
 * API Decrypt Configuration Interface
 */
export interface ApiEncryptConfig {
  /** Encryption algorithm */
  algorithm: 'AES' | 'RSA';
  /** Whether to enable decryption */
  enable: boolean;
  /** Synchronising folder */
  header: string;
  /** Request encryption keys (AES keys or RSA public keys) */
  requestKey: string;
  /** Respond to decryption keys (AES keys or RSA private keys) */
  responseKey: string;
}

/**
 * API Crypt Master
 */
export class ApiEncrypt {
  private config: ApiEncryptConfig;

  constructor(config: ApiEncryptConfig) {
    this.config = config;
  }

  /**
   * Decrypted response data * @param encryptData encrypted response data * @returns decrypted data
   */
  decryptResponse(encryptedData: string): any {
    if (!this.config.enable) {
      return encryptedData;
    }

    try {
      let decryptedData: false | string = '';
      if (this.config.algorithm.toUpperCase() === 'AES') {
        if (!this.config.responseKey) {
          throw new Error('AES Response Decrypt Key Unconfigurated');
        }
        decryptedData = AES.decrypt(encryptedData, this.config.responseKey);
      } else if (this.config.algorithm.toUpperCase() === 'RSA') {
        if (!this.config.responseKey) {
          throw new Error('RSA private key not configured');
        }
        decryptedData = RSA.decrypt(encryptedData, this.config.responseKey);
        if (decryptedData === false) {
          throw new Error('RSA decryption failed');
        }
      } else {
        throw new Error(
          `Unsupported decryption algorithm: ${this.config.algorithm}`,
        );
      }

      if (!decryptedData) {
        throw new Error('Decrypt result is empty');
      }

      // Try parsing to JSON, return the string if failed
      try {
        return JSON.parse(decryptedData);
      } catch {
        return decryptedData;
      }
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  /**
   * Encrypt request data* @param data to encrypt data* @returns encrypted data
   */
  encryptRequest(data: any): string {
    if (!this.config.enable) {
      return data;
    }

    try {
      const jsonData = typeof data === 'string' ? data : JSON.stringify(data);

      if (this.config.algorithm.toUpperCase() === 'AES') {
        if (!this.config.requestKey) {
          throw new Error('AES request encryption key not configured');
        }
        return AES.encrypt(jsonData, this.config.requestKey);
      } else if (this.config.algorithm.toUpperCase() === 'RSA') {
        if (!this.config.requestKey) {
          throw new Error('RSA public key not configured');
        }
        const result = RSA.encrypt(jsonData, this.config.requestKey);
        if (result === false) {
          throw new Error('RSA encryption failed');
        }
        return result;
      } else {
        throw new Error(
          `Unsupported encryption algorithm: ${this.config.algorithm}`,
        );
      }
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  /**
   * Fetch Encryption Header Name
   */
  getEncryptHeader(): string {
    return this.config.header;
  }
}

/**
 * Create API decryption instance based on environmental variables * @param env environment variable object * @returns ApiEncrypt example
 */
export function createApiEncrypt(env: Record<string, any>): ApiEncrypt {
  const config: ApiEncryptConfig = {
    enable: env.VITE_APP_API_ENCRYPT_ENABLE === 'true',
    header: env.VITE_APP_API_ENCRYPT_HEADER || 'X-Api-Encrypt',
    algorithm: env.VITE_APP_API_ENCRYPT_ALGORITHM || 'AES',
    requestKey: env.VITE_APP_API_ENCRYPT_REQUEST_KEY || '',
    responseKey: env.VITE_APP_API_ENCRYPT_RESPONSE_KEY || '',
  };

  return new ApiEncrypt(config);
}
