import { apiGet, apiPost } from "./client";
import type { CreateVaultInput, Transaction, Vault } from "@/types";

export async function listVaults(): Promise<Vault[]> {
  const { vaults } = await apiGet<{ vaults: Vault[] }>("/vaults");
  return vaults;
}

export async function getVault(id: string): Promise<Vault> {
  const { vault } = await apiGet<{ vault: Vault }>(`/vaults/${id}`);
  return vault;
}

export async function createVault(input: CreateVaultInput): Promise<Vault> {
  const { vault } = await apiPost<{ vault: Vault }>("/vaults", input);
  return vault;
}

export async function listTransactions(vaultId: string): Promise<Transaction[]> {
  const { transactions } = await apiGet<{ transactions: Transaction[] }>(
    `/vaults/${vaultId}/transactions`,
  );
  return transactions;
}

export async function receiveFunds(
  vaultId: string,
  amount: string,
  from: string,
): Promise<Transaction> {
  const { transaction } = await apiPost<{ transaction: Transaction }>(
    `/vaults/${vaultId}/receive`,
    { amount, from },
  );
  return transaction;
}
