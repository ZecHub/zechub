"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Vault as VaultIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/EmptyState";
import { VaultCard } from "@/components/VaultCard";
import { listVaults } from "@/lib/api/vaults";
import type { Vault } from "@/types";

export default function Home() {
  const [vaults, setVaults] = useState<Vault[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listVaults()
      .then(setVaults)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Vaults</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Threshold-protected shielded ZEC, secured by real FROST signatures.
          </p>
        </div>
        <Link href="/create" className={buttonVariants({})}>
          <Plus className="h-4 w-4" />
          New vault
        </Link>
      </div>

      {error && (
        <p className="text-sm text-destructive">Couldn&apos;t load vaults: {error}</p>
      )}

      {!vaults && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-md" />
          ))}
        </div>
      )}

      {vaults && vaults.length === 0 && (
        <EmptyState
          icon={VaultIcon}
          title="No vaults yet"
          description="Create a threshold vault and run a real distributed key generation ceremony to get started."
          action={
            <Link href="/create" className={buttonVariants({ size: "sm" })}>
              Create your first vault
            </Link>
          }
        />
      )}

      {vaults && vaults.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vaults.map((vault) => (
            <VaultCard key={vault.id} vault={vault} />
          ))}
        </div>
      )}
    </div>
  );
}
