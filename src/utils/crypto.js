import CryptoJS from 'crypto-js';
import {ENCRYPTION_SECRET_KEY} from '@env';

const SECRET_KEY = ENCRYPTION_SECRET_KEY;

/**
 * Encrypts a given string using AES encryption.
 * @param {string} data - The data to encrypt.
 * @returns {string} - The encrypted data.
 */
export const encryptData = data => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

/**
 * Decrypts a given string using AES decryption.
 * @param {string} encryptedData - The encrypted data to decrypt.
 * @returns {string} - The decrypted data.
 */
export const decryptData = encryptedData => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
