import { MOBILE_REGEX } from './regex';

/**
 * Verify if mobile phone number (China)* * @param value * @returns whether mobile phone number (China)
 */
function isMobile(value?: null | string): boolean {
  if (!value) {
    return false;
  }
  return MOBILE_REGEX.test(value);
}

export { isMobile };