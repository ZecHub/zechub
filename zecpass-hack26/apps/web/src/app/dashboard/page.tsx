'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SessionCard } from '@/components/SessionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, Shield, ArrowRight, Loader2 } from 'lucide-react';

interface SessionData {
  valid: boolean;
  session_id: string;
  app_id: string;
  scope: string[];
  zk_proof_hash: string;
  expires_at: number;
}

export default function DashboardPage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((data) => { if (data.valid) setSession(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const copyHash = () => {
    if (session) {
      navigator.clipboard.writeText(session.zk_proof_hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-zec-gold" /></div>;
  }

  if (!session) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary mb-4">No active session found.</p>
        <Link href="/auth/login"><Button>Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-text-secondary mt-1">Manage your ZecPass identity and sessions</p>
      </div>

      {/* ZK Proof Hash */}
      <Card className="glow-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-zec-gold" />
            Your ZK Identity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-text-muted mb-2">
            This is your privacy-preserving identifier. Apps see this hash — never your Zcash address.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-3 rounded-lg bg-bg-secondary border border-border-primary font-mono text-sm text-zec-gold truncate">
              {session.zk_proof_hash}
            </code>
            <Button variant="outline" size="icon" onClick={copyHash}>
              {copied ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current session */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Session</h2>
          <Link href="/dashboard/badges">
            <Button variant="ghost" size="sm">
              View Badges <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4">
          <SessionCard
            session_id={session.session_id}
            app_id={session.app_id}
            app_name="ZecPass Platform"
            scope={session.scope}
            issued_at={new Date().toISOString()}
            expires_at={new Date(session.expires_at * 1000).toISOString()}
          />
        </div>
      </div>
    </div>
  );
}
