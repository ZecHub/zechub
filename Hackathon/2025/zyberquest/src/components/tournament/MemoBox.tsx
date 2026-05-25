'use client';

import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

type Props = {
  memo: string;
  loading?: boolean;
};

export default function MemoBox({ memo, loading }: Props) {
  const labelId = useId();
  const warnId = useId();
  const { toast } = useToast();

  async function handleCopy() {
    const text = memo;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied memo', description: 'Memo code added to clipboard.' });
    } catch {
      const ok = window.prompt('Copy this memo:', text);
      if (ok !== null) {
        toast({ title: 'Memo visible', description: 'Copy it manually from the prompt.' });
      }
    }
  }

  return (
    <Card className="flex flex-col gap-2 border-amber-400/30 bg-zinc-950/60 p-3" aria-describedby={warnId}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p id={labelId} className="text-xs text-zinc-400">
            Memo (required)
          </p>
          <p
            className={`truncate font-mono text-sm ${loading ? 'opacity-60' : ''}`}
            aria-labelledby={labelId}
            role="textbox"
            aria-readonly="true"
          >
            {memo || (loading ? 'loading…' : '—')}
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          disabled={!memo || loading}
          aria-disabled={!memo || loading}
          aria-label="Copy Memo"
          onClick={handleCopy}
        >
          Copy Memo
        </Button>

      </div>

      <p id={warnId} role="alert" className="text-xs text-amber-400/90">
        You must include the memo.
      </p>
    </Card>
  );
}
