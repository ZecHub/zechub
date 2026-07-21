import type { SiwzErrorCode } from "./types.js";

export class SiwzError extends Error {
  readonly code: SiwzErrorCode;

  constructor(code: SiwzErrorCode, message: string) {
    super(message);
    this.name = "SiwzError";
    this.code = code;
  }
}
