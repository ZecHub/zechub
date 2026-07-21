// Module augmentation for next-auth: type the extra fields SiwzProvider /
// SiwzMemoProvider / snap provider attach to User, JWT, and Session.
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    addressType?: string;
    network?: string;
  }
  interface Session {
    user?: DefaultSession["user"] & {
      address?: string;
      addressType?: string;
      network?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    address?: string;
    addressType?: string;
    network?: string;
  }
}
