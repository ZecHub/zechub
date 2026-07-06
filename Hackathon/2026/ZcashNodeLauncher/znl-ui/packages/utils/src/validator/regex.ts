/** Cell phone number regular expression (China) */
const MOBILE_REGEX = /(?:0|86|\+86)?1[3-9]\d{9}/;
/** I.D. Number Regular Expression */
const ID_CARD_REGEX = /^\d{15}|\d{18}$/;
/** Mailbox Regular Expression */
const EMAIL_REGEX = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
/** Password regular expression Starts with a letter length between 6 and 18 and can only contain letters, numbers, and underlined */
const PASSWORD_REGEX = /^[a-z]\w{5,17}$/i;
/** A strong password must contain a combination of case letters and numbers, cannot use a special character with a length between 8 and 10  */
const STRONG_PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;

export {
  EMAIL_REGEX,
  ID_CARD_REGEX,
  MOBILE_REGEX,
  PASSWORD_REGEX,
  STRONG_PASSWORD_REGEX,
};