import { Account } from "@near-js/accounts";
import { JsonRpcProvider } from "@near-js/providers";
import { KeyPairSigner } from "@near-js/signers";

export const MAIN_NEAR_PRIVATE_KEY = (process.env.MAIN_NEAR_PRIVATE_KEY || "") as any;
export const MAIN_NEAR_ACOUNT = process.env.MAIN_NEAR_ACOUNT || "";

export const provider = new JsonRpcProvider({
    url: "https://test.rpc.fastnear.com",
});


export const signer = KeyPairSigner.fromSecretKey(MAIN_NEAR_PRIVATE_KEY);
export const account = new Account(MAIN_NEAR_ACOUNT, provider, signer);
