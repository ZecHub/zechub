'use client';

import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

type Props = {
  address: string;
  loading?: boolean;
};

export default function AddressBox({ address, loading }: Props) {
  const labelId = useId();
  const { toast } = useToast();

  async function handleCopy() {
    const text = address;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied UA', description: 'Unified Address added to clipboard.' });
    } catch {
      // Fallback básico
      const ok = window.prompt('Copy this address:', text);
      if (ok !== null) {
        toast({ title: 'UA visible', description: 'Copy it manually from the prompt.' });
      }
    }
  }

  return (
    <Card className="flex items-center justify-between gap-3 border-zinc-800/60 bg-zinc-950/60 p-3">
      <div className="min-w-0">
        <p id={labelId} className="text-xs text-zinc-400">
          Zcash Unified Address (UA)
        </p>
        <p
          className={`truncate font-mono text-sm ${loading ? 'opacity-60' : ''}`}
          aria-labelledby={labelId}
          role="textbox"
          aria-readonly="true"
        >
          {address || (loading ? 'loading…' : '—')}
        </p>
      </div>

      <Button
        type="button"
        variant="secondary"
        className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
        disabled={!address || loading}
        aria-disabled={!address || loading}
        aria-label="Copy Unified Address"
        onClick={handleCopy}
      >
        Copy UA
      </Button>

    </Card>
  );
}
