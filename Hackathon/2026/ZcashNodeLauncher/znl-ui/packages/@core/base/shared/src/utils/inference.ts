// eslint-disable-next-line vue/prefer-import-from-vue
import { isFunction, isObject, isString } from '@vue/shared';

/**
 * Checks if the incoming value is undefined. * @param {unknown} value to check. * @returns {boolean} returns True if the value is undefined, otherwise returns false.
 */
function isUndefined(value?: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if the incoming value is boolean * @param value * @returns returns True if the value is a boolean value, otherwise returns false.
 */
function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * * The following will be considered empty: * - the value is null. * - the value is undefined. * - the value is an empty string. * - the value is a array of zeros. * - the value is a Map or Set without an element. * - the value is an object without attributes. * * @param{T} value to check. * @returns {bouolean} returns true or false if the value is empty.
 */
function isEmpty<T = unknown>(value?: T): value is T {
  if (value === null || value === undefined) {
    return true;
  }

  if (Array.isArray(value) || isString(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Checks whether the incoming string is a valid HTTP or HTTPS URL. * @param {string} url the string to check. * @return {boolean} returns True if the string is a valid HTTP or HTTPS URL, otherwise returns false.
 */
function isHttpUrl(url?: string): boolean {
  if (!url) {
    return false;
  }
  // Test URL with regular expression to start with http:// or https://
  const httpRegex = /^https?:\/\/.*$/;
  return httpRegex.test(url);
}

/**
 * Checks if the incoming value is a window object. * @param {any} value to check. * @returns {boolean} returns True if the value is a window object, otherwise returns False.
 */
function isWindow(value: any): value is Window {
  return (
    typeof window !== 'undefined' && value !== null && value === value.window
  );
}

/**
 * Checks whether the current operating environment is Mac OS. * This function determines the current operating environment by checking the Navigator.userAgent string. * If the userAgent string contains "macintosh" or "mac osx" (without case-sensitive), the current environment is considered to be Mac OS. * @returns {boolean} If the current environment is Mac OS, return True, otherwise return false.
 */
function isMacOs(): boolean {
  const macRegex = /macintosh|mac os x/i;
  return macRegex.test(navigator.userAgent);
}

/**
 * Checks whether the current operating environment is Windows OS. * This function determines the current operating environment by checking the Navigator.userAgent string. * If the userAgent string contains "windows" or "win32" (without case-specificity), the current environment is considered Windows OS. * * @returns {boolean} Returns True if the current environment is Windows OS, otherwise returns false.
 */
function isWindowsOs(): boolean {
  const windowsRegex = /windows|win32/i;
  return windowsRegex.test(navigator.userAgent);
}

/**
 * Check if the incoming value is a number* @param value
 */
function isNumber(value: any): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Returns the first value in the provided list that is neither `null` nor `undefined`.
 *
 * This function iterates over the input values and returns the first one that is
 * not strictly equal to `null` or `undefined`. If all values are either `null` or
 * `undefined`, it returns `undefined`.
 *
 * @template T - The type of the input values.
 * @param {...(T | null | undefined)[]} values - A list of values to evaluate.
 * @returns {T | undefined} - The first value that is not `null` or `undefined`, or `undefined` if none are found.
 *
 * @example
 * // Returns 42 because it is the first non-null, non-undefined value.
 * getFirstNonNullOrUndefined(undefined, null, 42, 'hello'); // 42
 *
 * @example
 * // Returns 'hello' because it is the first non-null, non-undefined value.
 * getFirstNonNullOrUndefined(null, undefined, 'hello', 123); // 'hello'
 *
 * @example
 * // Returns undefined because all values are either null or undefined.
 * getFirstNonNullOrUndefined(undefined, null); // undefined
 */
function getFirstNonNullOrUndefined<T>(
  ...values: (null | T | undefined)[]
): T | undefined {
  for (const value of values) {
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return undefined;
}

export {
  getFirstNonNullOrUndefined,
  isBoolean,
  isEmpty,
  isFunction,
  isHttpUrl,
  isMacOs,
  isNumber,
  isObject,
  isString,
  isUndefined,
  isWindow,
  isWindowsOs,
};