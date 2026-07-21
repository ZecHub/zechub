/** Low-level ZecAuth crypto — RedPallas, ZIP-32 ad-hoc derivation, Pallas group. */
export {
  type AuthKeyPair,
  type Network,
  deriveAuthKeyPair,
  deriveAuthPubkey,
  signWithKeyPair,
  exportScalarLE,
} from "./keys.js";
export { sign as redpallasSign, verify as redpallasVerify, hStar } from "./redpallas.js";
export { deriveAdhoc, master, deriveChildHardened } from "./zip32.js";
export { chacha20FirstBlock } from "./chacha.js";
export {
  P,
  Q,
  Fp,
  Fq,
  BASEPOINT,
  BASEPOINT_BYTES,
  type Point,
  add,
  double,
  negate,
  mul,
  encodePoint,
  decodePoint,
  encodeScalar,
  decodeScalarCanonical,
  scalarFromWideLE,
} from "./pallas.js";
